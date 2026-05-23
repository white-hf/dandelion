# AI Reputation Website Engine Detailed Design

**文档版本:** 1.0
**创建日期:** 2026-05-23
**Owner:** Dandelion
**面向读者:** 架构师、后端、前端、Agent 开发者
**相关文档:** [Product Strategy](../product/Product_Strategy.md), [AI Reputation Website Engine PRD](../product/AI_Reputation_Website_Engine_PRD.md), [Operating Playbook](../business/AI_Reputation_Website_Operating_Playbook.md), [Iteration Plan](../delivery/Iteration_Plan.md)

---

## 1. Design Goal

构建一个可控的 AI 网站生产线：

```text
Prospect discovery
-> qualification
-> site_config generation
-> safety check
-> preview render/build
-> QA
-> outreach draft
-> human approval
-> customer payment/auth
-> active launch
-> maintenance
```

系统必须服务一人公司：

- 自动化重复工作；
- 保留人工 gate；
- 避免违法 scraping 和 spam；
- 避免每个客户定制开发；
- preview 质量高于普通模板站；
- 客户购买后才能正式上线。

## 2. Architecture Style

第一版采用 monorepo 内模块化架构：

- `packages/backend/dandelion_core/modules/*`: shared backend modules。
- `clients/dandelion/frontend/app/*`: company site、preview renderer、operator pages。
- `scripts/*`: discovery、generation、smoke、maintenance CLI。
- MySQL 继续作为本地验证数据库。

第一版不需要：

- Celery/RQ/Temporal。
- 完整多租户 SaaS。
- 自助 builder。
- 自动发送邮件。

后续扩展可以把 agent jobs 接入队列，但当前先用 DB 状态 + CLI/script。

## 3. Module Breakdown

### 3.1 prospects

职责：

- prospect CRUD。
- CSV/manual import。
- Google Places API import adapter。
- website status classifier。
- scoring。
- do-not-contact suppression。

Files:

```text
packages/backend/dandelion_core/modules/prospects/models.py
packages/backend/dandelion_core/modules/prospects/schemas.py
packages/backend/dandelion_core/modules/prospects/service.py
packages/backend/dandelion_core/modules/prospects/router.py
scripts/discover_halifax_prospects.py
```

### 3.2 content_sources

职责：

- 记录每个内容字段来源。
- 标记授权状态。
- 标记平台限制。
- 支持正式上线前审查。

字段示例：

```text
field_key=headline
source_type=generated_inference
authorization_status=not_required
```

```text
field_key=photo
source_type=client_provided
authorization_status=approved
```

### 3.3 site_configs

职责：

- 保存 `site_config_json`。
- JSON schema validation。
- versioning。
- safety status。
- source map。

规则：

- AI 只生成 site_config，不直接改 React 页面。
- Renderer 只消费 site_config。
- Preview 和 active 站点共用配置，但模式不同。

### 3.4 preview_sites

职责：

- 管理 preview slug。
- 管理 build/smoke/QA 状态。
- 管理 noindex/disclaimer/form mode。
- 关联 site_config。

### 3.5 outreach

职责：

- 生成 email draft。
- 保存 draft。
- 人工 approval。
- mark sent / replied / unsubscribed。

规则：

- 不自动发送。
- `do_not_contact` 绝对阻断。
- QA failed 绝对阻断。

### 3.6 activation

职责：

- customer record。
- agreement checklist。
- content authorization checklist。
- billing state。
- launch checklist。

规则：

- 未付款不能 launch。
- 未授权不能 launch。
- 未确认 live form destination 不能 launch。

### 3.7 agent_runs

职责：

- 记录每次 agent/script 执行。
- 保存输入输出和错误。
- 支持 review 和 debug。

## 4. State Machines

### 4.1 Prospect State

```text
discovered
-> reviewed
-> qualified
-> preview_generated
-> contacted
-> replied
-> interested
-> won
-> lost
-> do_not_contact
```

Blocked transitions:

- `do_not_contact` cannot transition to contacted.
- `blocked` compliance cannot transition to preview_generated.
- `good` website_status cannot transition to contacted unless operator explicitly overrides.

### 4.2 Site Config State

```text
draft
-> generated
-> safety_pending
-> safety_passed
-> approved_for_preview
-> archived
```

Safety failed:

```text
safety_failed -> draft
```

### 4.3 Preview State

```text
build_pending
-> build_passed
-> smoke_pending
-> smoke_passed
-> qa_passed
-> outreach_ready
```

Failures:

```text
build_failed
smoke_failed
qa_failed
```

### 4.4 Customer Activation State

```text
customer_pending_payment
-> setup_paid
-> subscription_active
-> authorization_complete
-> launch_ready
-> active_customer
```

Failures:

```text
payment_failed
launch_blocked
paused
cancelled
```

## 5. Database Design

Use MySQL-compatible types.

### 5.1 prospects

```sql
CREATE TABLE prospects (
  id CHAR(36) PRIMARY KEY,
  business_name VARCHAR(255) NOT NULL,
  category VARCHAR(120) NOT NULL,
  city VARCHAR(120) NOT NULL,
  region VARCHAR(120) NOT NULL,
  source VARCHAR(80) NOT NULL,
  source_url TEXT,
  place_id VARCHAR(255) NULL,
  website_url TEXT,
  website_status VARCHAR(40) NOT NULL DEFAULT 'unknown',
  rating DECIMAL(3,2) NULL,
  review_count INT NULL,
  photo_count INT NULL,
  phone VARCHAR(60),
  email VARCHAR(255),
  status VARCHAR(60) NOT NULL DEFAULT 'discovered',
  compliance_status VARCHAR(60) NOT NULL DEFAULT 'review_needed',
  score INT NOT NULL DEFAULT 0,
  score_reasons TEXT,
  do_not_contact BOOLEAN NOT NULL DEFAULT FALSE,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  UNIQUE KEY ux_prospects_place_id (place_id),
  INDEX idx_prospects_geo_category_status (city, region, category, website_status),
  INDEX idx_prospects_score (score, review_count, rating),
  INDEX idx_prospects_pipeline (status, compliance_status, updated_at),
  INDEX idx_prospects_suppression (do_not_contact, status)
);
```

### 5.2 content_sources

```sql
CREATE TABLE content_sources (
  id CHAR(36) PRIMARY KEY,
  prospect_id CHAR(36) NULL,
  customer_id CHAR(36) NULL,
  source_type VARCHAR(60) NOT NULL,
  source_url TEXT,
  field_key VARCHAR(120) NOT NULL,
  value_json JSON NOT NULL,
  authorization_status VARCHAR(60) NOT NULL DEFAULT 'pending',
  platform_policy_notes TEXT,
  created_at DATETIME NOT NULL,
  INDEX idx_content_sources_entity (prospect_id, field_key, authorization_status),
  INDEX idx_content_sources_customer (customer_id, field_key, authorization_status)
);
```

### 5.3 site_configs

```sql
CREATE TABLE site_configs (
  id CHAR(36) PRIMARY KEY,
  prospect_id CHAR(36) NOT NULL,
  customer_id CHAR(36) NULL,
  version INT NOT NULL DEFAULT 1,
  template_key VARCHAR(80) NOT NULL,
  style_key VARCHAR(80) NOT NULL,
  config_json JSON NOT NULL,
  source_map_json JSON,
  safety_status VARCHAR(40) NOT NULL DEFAULT 'pending',
  status VARCHAR(40) NOT NULL DEFAULT 'draft',
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  INDEX idx_site_configs_lookup (prospect_id, status, version),
  INDEX idx_site_configs_safety (safety_status, updated_at)
);
```

### 5.4 preview_sites

```sql
CREATE TABLE preview_sites (
  id CHAR(36) PRIMARY KEY,
  prospect_id CHAR(36) NOT NULL,
  site_config_id CHAR(36) NOT NULL,
  slug VARCHAR(160) NOT NULL,
  preview_url TEXT,
  build_status VARCHAR(40) NOT NULL DEFAULT 'pending',
  smoke_status VARCHAR(40) NOT NULL DEFAULT 'pending',
  qa_report_json JSON,
  noindex BOOLEAN NOT NULL DEFAULT TRUE,
  disclaimer_present BOOLEAN NOT NULL DEFAULT FALSE,
  form_mode VARCHAR(40) NOT NULL DEFAULT 'test',
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  UNIQUE KEY ux_preview_sites_slug (slug),
  INDEX idx_preview_sites_status (build_status, smoke_status, updated_at),
  INDEX idx_preview_sites_prospect (prospect_id, updated_at)
);
```

### 5.5 outreach_events

```sql
CREATE TABLE outreach_events (
  id CHAR(36) PRIMARY KEY,
  prospect_id CHAR(36) NOT NULL,
  preview_site_id CHAR(36) NOT NULL,
  channel VARCHAR(40) NOT NULL DEFAULT 'email',
  status VARCHAR(40) NOT NULL DEFAULT 'draft',
  subject VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  approved_by VARCHAR(120),
  sent_at DATETIME NULL,
  reply_at DATETIME NULL,
  unsubscribe_at DATETIME NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  INDEX idx_outreach_pipeline (status, sent_at, reply_at),
  INDEX idx_outreach_prospect (prospect_id, status)
);
```

### 5.6 customers and activation_checklists

```sql
CREATE TABLE customers (
  id CHAR(36) PRIMARY KEY,
  prospect_id CHAR(36) NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  plan_key VARCHAR(80) NOT NULL,
  billing_status VARCHAR(60) NOT NULL DEFAULT 'pending',
  activation_status VARCHAR(60) NOT NULL DEFAULT 'pending_payment',
  domain VARCHAR(255),
  notification_email VARCHAR(255),
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  UNIQUE KEY ux_customers_prospect (prospect_id),
  INDEX idx_customers_status (billing_status, activation_status, updated_at)
);

CREATE TABLE activation_checklists (
  id CHAR(36) PRIMARY KEY,
  customer_id CHAR(36) NOT NULL,
  agreement_accepted BOOLEAN NOT NULL DEFAULT FALSE,
  content_authorized BOOLEAN NOT NULL DEFAULT FALSE,
  setup_fee_paid BOOLEAN NOT NULL DEFAULT FALSE,
  subscription_active BOOLEAN NOT NULL DEFAULT FALSE,
  business_facts_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
  domain_ready BOOLEAN NOT NULL DEFAULT FALSE,
  live_form_ready BOOLEAN NOT NULL DEFAULT FALSE,
  launch_status VARCHAR(60) NOT NULL DEFAULT 'blocked',
  updated_at DATETIME NOT NULL,
  UNIQUE KEY ux_activation_customer (customer_id),
  INDEX idx_activation_launch_status (launch_status, updated_at)
);
```

### 5.7 agent_runs

```sql
CREATE TABLE agent_runs (
  id CHAR(36) PRIMARY KEY,
  job_type VARCHAR(80) NOT NULL,
  entity_type VARCHAR(80) NOT NULL,
  entity_id CHAR(36) NOT NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'pending',
  input_json JSON,
  output_json JSON,
  error_message TEXT,
  triggered_by VARCHAR(80) NOT NULL DEFAULT 'operator',
  started_at DATETIME NULL,
  finished_at DATETIME NULL,
  INDEX idx_agent_runs_entity (entity_type, entity_id, status),
  INDEX idx_agent_runs_job (job_type, status, started_at)
);
```

## 6. API Design

All operator APIs require admin authentication.

```text
GET    /api/operator/prospects
POST   /api/operator/prospects/import
PATCH  /api/operator/prospects/{id}
POST   /api/operator/prospects/{id}/qualify

POST   /api/operator/site-configs/generate
GET    /api/operator/site-configs/{id}
POST   /api/operator/site-configs/{id}/safety-check
PATCH  /api/operator/site-configs/{id}/approve-preview

POST   /api/operator/previews
GET    /api/operator/previews/{id}
POST   /api/operator/previews/{id}/smoke

POST   /api/operator/outreach/draft
PATCH  /api/operator/outreach/{id}/approve
PATCH  /api/operator/outreach/{id}/mark-sent
PATCH  /api/operator/outreach/{id}/unsubscribe

POST   /api/operator/customers/from-prospect/{prospect_id}
GET    /api/operator/customers/{id}/activation-checklist
PATCH  /api/operator/customers/{id}/activation-checklist
POST   /api/operator/customers/{id}/launch
```

Public:

```text
GET    /preview/{slug}
POST   /api/public/preview/{slug}/form-test
GET    /sites/{customer_slug}
POST   /api/public/sites/{customer_slug}/lead
```

## 7. Frontend Design

### 7.1 Company Website

Routes:

```text
/
/how-it-works
/examples
/pricing
/why-not-a-builder
/for-contacted-businesses
/trust-and-legal
```

### 7.2 Preview Renderer

Route:

```text
/preview/[slug]
```

Renderer props:

```ts
type SiteConfig = {
  business: BusinessProfile;
  brand: BrandConfig;
  content: ContentConfig;
  media: MediaConfig;
  conversion: ConversionConfig;
  compliance: ComplianceConfig;
};
```

Preview mode must force:

- `noindex`
- unofficial preview banner
- test-mode form
- remove request link
- activate CTA

Active mode must force:

- no preview banner
- live form
- privacy link
- authorized content only

### 7.3 Operator Console

Do not build a heavy admin first. Minimal screens:

- prospects list
- prospect detail
- site_config viewer
- preview QA report
- outreach draft review
- activation checklist

## 8. Agent Implementation Notes

Agents can be implemented as scripts first:

```text
scripts/discover_halifax_prospects.py
scripts/import_prospects.py
scripts/generate_site_config.py
scripts/safety_check_site_config.py
scripts/build_preview.py
scripts/smoke_preview.py
scripts/generate_outreach_draft.py
```

Rules:

- Every script writes `agent_runs`.
- Every script is idempotent for the same entity/version.
- No script sends real email in R0.8.
- No script launches active customer site before activation checklist passes.

## 9. Validation Strategy

### Unit tests

- website status classifier
- scoring
- site_config schema validation
- safety checker
- state transition guards

### Integration tests

- import prospects -> qualify -> generate config -> safety pass -> preview created
- QA failed blocks outreach draft
- do_not_contact blocks outreach
- activation checklist blocks launch

### Smoke tests

- preview route returns 200
- CSS includes key classes/tokens
- noindex exists
- disclaimer exists
- preview form test mode saves event but sends no notification

## 10. Architect Development Order

1. Database migrations and ORM models.
2. Prospect import and classifier.
3. Site config schema and renderer.
4. Preview route with static sample configs.
5. Agent run logging.
6. Safety checker.
7. Preview smoke script.
8. Outreach draft only.
9. Activation checklist.
10. Launch workflow.

Do not start with full automation or email sending. Build the state machine first.
