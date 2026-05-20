# 共享模块系统设计

**文档版本:** 1.0  
**编写日期:** 2026-05-18  
**设计目标:** 将 Lead、Quote、Appointment、Event、Notification、Admin CRM、Dashboard 等后台能力抽象成可复用代码组件，让每个客户网站独立部署但共享同一套产品能力。  
**关键架构选择:** 共享代码，不共享运行时数据；不是中心化多租户 SaaS。

---

## 1. 架构定位

本系统采用 **Shared Modules + Per-Client Deployment**：

- 每个客户网站是独立项目、独立部署、独立数据库、独立环境变量。
- 通用后台能力以内部共享模块形式提供，客户项目按需引用。
- 客户差异通过 `config`、`schema`、`theme`、`copy`、`workflow` 注入。
- 不建设中心化多租户 SaaS，不让所有客户共享同一个生产数据库。
- 后续如模块成熟，可发布为内部 Python package / npm package，目前先使用 monorepo packages。

## 2. 推荐目录结构

```text
packages/
  backend/
    dandelion_core/
      database/
        connection.py
        migrations/
      modules/
        leads/
          models.py
          schemas.py
          repository.py
          router.py
          service.py
        events/
        notifications/
        admin_crm/
        dashboard/
        quote/
        appointment/
        review/
        intake/
      integrations/
        email/
        calendar/
        sms/
        export/
      config/
        client_config.py
        module_config.py

  frontend/
    src/
      forms/
        LeadForm.tsx
        QuoteForm.tsx
        AppointmentForm.tsx
      admin/
        LeadList.tsx
        LeadDetail.tsx
        DashboardCards.tsx
      tracking/
        trackEvent.ts
      config/
        types.ts

clients/
  dandelion/
  hvac-demo/
  clinic-demo/
```

## 3. Backend Module Interface

每个后端模块必须遵守同一种结构，便于客户项目组合使用。

```python
# client app
from fastapi import FastAPI
from dandelion_core.config import ClientConfig
from dandelion_core.modules.leads import create_leads_router
from dandelion_core.modules.events import create_events_router

config = ClientConfig.from_env()
app = FastAPI(title=config.project_name)

app.include_router(create_leads_router(config), prefix="/api")
app.include_router(create_events_router(config), prefix="/api")
```

模块目录必须提供：

- `models.py`: SQLAlchemy/SQLModel table definitions 或 SQLite-compatible model metadata。
- `schemas.py`: Pydantic request/response schemas。
- `repository.py`: 数据访问，不写业务流程。
- `service.py`: 业务流程、事件写入、通知调用。
- `router.py`: FastAPI route factory。

禁止：

- 模块内部读取客户硬编码常量。
- 模块内部直接依赖某个客户项目目录。
- 模块之间循环 import。
- 在 form schema 变化时改核心表结构。

## 4. Frontend Module Interface

前端共享模块以 React 组件和 hooks 形式提供。

```tsx
import { QuoteForm, LeadDashboard } from "@dandelion/frontend";
import { hvacQuoteConfig } from "./client-config";

export default function HvacPage() {
  return (
    <>
      <QuoteForm config={hvacQuoteConfig} />
      <LeadDashboard config={dashboardConfig} />
    </>
  );
}
```

组件必须通过 props/config 注入差异：

- 字段
- validation
- CTA 文案
- success message
- tracking metadata
- API endpoint
- theme tokens

组件不得硬编码：

- 客户名称
- 行业字段
- 通知收件人
- API base URL
- 私有文案

## 5. Client Config

每个客户项目维护一个 `client.config.ts` 和后端 `client_config.py`。

### 5.1 Backend Config

```python
class ClientConfig(BaseModel):
    project_name: str
    client_key: str
    database_url: str
    admin_api_key: str | None
    enabled_modules: list[str]
    notification_recipients: list[str]
    email_provider: Literal["mock", "smtp", "mailgun", "sendgrid"]
    public_base_url: str
    privacy_profile: Literal["standard", "health-adjacent", "legal-adjacent"]
```

### 5.2 Frontend Config

```ts
type FormFieldConfig = {
  name: string;
  label: string;
  type: "text" | "email" | "phone" | "select" | "textarea" | "checkbox" | "date";
  required?: boolean;
  options?: string[];
  helpText?: string;
  pii?: boolean;
};

type ModuleFormConfig = {
  module: "lead" | "quote" | "appointment" | "intake";
  industry: string;
  primaryCta: string;
  successMessage: string;
  fields: FormFieldConfig[];
  tracking: {
    source: string;
    medium: string;
    campaign: string;
  };
};
```

## 6. Data Layer Strategy

### 6.1 Database Choice

MVP:

- SQLite per client for local demo and very small deployments.
- Use repository interface so PostgreSQL migration does not change module APIs.

Production default:

- PostgreSQL per client deployment.
- Optional shared managed PostgreSQL server, but separate database or schema per client.
- No shared tenant table required in MVP because each client deployment is isolated.

### 6.2 Data Ownership

- Each client owns its own database.
- Shared modules own schema definitions and migrations.
- Client-specific custom fields go into JSON columns or module payload tables, not core table columns.
- Sensitive industry data should be minimized before storage.

## 7. Core Data Model

The following schema is PostgreSQL-first, with SQLite-compatible naming.

### 7.1 leads

Purpose: central record for any business opportunity captured from website, quote, booking, audit, or intake flow.

```sql
CREATE TABLE leads (
  lead_id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  last_activity_at TIMESTAMPTZ NOT NULL,

  status TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'normal',
  lifecycle_stage TEXT NOT NULL DEFAULT 'new',

  module_source TEXT NOT NULL,
  form_key TEXT NOT NULL,
  industry TEXT,

  contact_name TEXT,
  email TEXT,
  phone TEXT,
  business_name TEXT,
  website_url TEXT,
  city TEXT,
  service_area TEXT,

  source TEXT,
  medium TEXT,
  campaign TEXT,
  referrer TEXT,
  landing_path TEXT,

  summary TEXT,
  consent BOOLEAN NOT NULL DEFAULT FALSE,
  consent_text TEXT,
  consent_at TIMESTAMPTZ,

  custom_fields JSONB NOT NULL DEFAULT '{}',
  tags JSONB NOT NULL DEFAULT '[]',

  archived_at TIMESTAMPTZ
);
```

### 7.2 lead_notes

```sql
CREATE TABLE lead_notes (
  note_id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL REFERENCES leads(lead_id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL,
  author TEXT NOT NULL,
  body TEXT NOT NULL,
  visibility TEXT NOT NULL DEFAULT 'internal'
);
```

### 7.3 events

Purpose: conversion analytics and operational timeline. Avoid storing raw PII unless required.

```sql
CREATE TABLE events (
  event_id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  occurred_at TIMESTAMPTZ NOT NULL,

  lead_id TEXT REFERENCES leads(lead_id) ON DELETE SET NULL,
  session_id TEXT,
  visitor_id TEXT,

  path TEXT,
  referrer TEXT,
  source TEXT,
  medium TEXT,
  campaign TEXT,

  module_source TEXT,
  form_key TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'
);
```

### 7.4 notification_logs

```sql
CREATE TABLE notification_logs (
  notification_id TEXT PRIMARY KEY,
  lead_id TEXT REFERENCES leads(lead_id) ON DELETE SET NULL,
  event_id TEXT REFERENCES events(event_id) ON DELETE SET NULL,

  type TEXT NOT NULL,
  channel TEXT NOT NULL,
  recipient TEXT NOT NULL,
  status TEXT NOT NULL,
  provider TEXT,
  provider_message_id TEXT,
  error_message TEXT,

  created_at TIMESTAMPTZ NOT NULL,
  sent_at TIMESTAMPTZ,
  next_retry_at TIMESTAMPTZ,
  retry_count INTEGER NOT NULL DEFAULT 0,

  payload JSONB NOT NULL DEFAULT '{}'
);
```

### 7.5 appointments

```sql
CREATE TABLE appointments (
  appointment_id TEXT PRIMARY KEY,
  lead_id TEXT REFERENCES leads(lead_id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,

  status TEXT NOT NULL,
  requested_start_at TIMESTAMPTZ,
  requested_end_at TIMESTAMPTZ,
  confirmed_start_at TIMESTAMPTZ,
  confirmed_end_at TIMESTAMPTZ,
  timezone TEXT,

  contact_name TEXT,
  email TEXT,
  phone TEXT,
  service_type TEXT,
  notes TEXT,
  external_calendar_event_id TEXT,
  custom_fields JSONB NOT NULL DEFAULT '{}'
);
```

### 7.6 review_requests

```sql
CREATE TABLE review_requests (
  review_request_id TEXT PRIMARY KEY,
  lead_id TEXT REFERENCES leads(lead_id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL,
  sent_at TIMESTAMPTZ,
  status TEXT NOT NULL,
  channel TEXT NOT NULL,
  recipient TEXT NOT NULL,
  review_url TEXT,
  feedback_score INTEGER,
  private_feedback TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'
);
```

### 7.7 intake_submissions

```sql
CREATE TABLE intake_submissions (
  intake_id TEXT PRIMARY KEY,
  lead_id TEXT REFERENCES leads(lead_id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL,
  form_key TEXT NOT NULL,
  status TEXT NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}',
  risk_flags JSONB NOT NULL DEFAULT '[]'
);
```

### 7.8 files

Only enable for clients that explicitly need file upload.

```sql
CREATE TABLE files (
  file_id TEXT PRIMARY KEY,
  lead_id TEXT REFERENCES leads(lead_id) ON DELETE SET NULL,
  intake_id TEXT REFERENCES intake_submissions(intake_id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL,
  storage_provider TEXT NOT NULL,
  storage_key TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  content_type TEXT,
  size_bytes INTEGER,
  uploaded_by TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'
);
```

### 7.9 admin_users

For independent deployments, this can stay simple. If using external auth, store external identity.

```sql
CREATE TABLE admin_users (
  admin_user_id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT,
  external_identity TEXT,
  role TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  last_login_at TIMESTAMPTZ,
  disabled_at TIMESTAMPTZ
);
```

### 7.10 form_configs

Optional runtime-configurable forms. Static config files are acceptable for early client projects.

```sql
CREATE TABLE form_configs (
  form_key TEXT PRIMARY KEY,
  module_source TEXT NOT NULL,
  industry TEXT,
  version INTEGER NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  schema_json JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
);
```

## 8. Query Scenarios and Index Design

Indexes are driven by actual admin/dashboard queries, not theoretical completeness.

### 8.1 Admin Lead Queue

Scenario:

- Show most recent non-archived leads.
- Filter by status, source, industry.
- Sort by `last_activity_at DESC`.

Query:

```sql
SELECT *
FROM leads
WHERE archived_at IS NULL
ORDER BY last_activity_at DESC
LIMIT 50;
```

Indexes:

```sql
CREATE INDEX idx_leads_active_last_activity
ON leads (last_activity_at DESC)
WHERE archived_at IS NULL;

CREATE INDEX idx_leads_status_last_activity
ON leads (status, last_activity_at DESC)
WHERE archived_at IS NULL;

CREATE INDEX idx_leads_industry_last_activity
ON leads (industry, last_activity_at DESC)
WHERE archived_at IS NULL;

CREATE INDEX idx_leads_source_last_activity
ON leads (source, last_activity_at DESC)
WHERE archived_at IS NULL;
```

### 8.2 Lead Detail Timeline

Scenario:

- Open lead detail and show notes, events, notifications.

Indexes:

```sql
CREATE INDEX idx_lead_notes_lead_created
ON lead_notes (lead_id, created_at DESC);

CREATE INDEX idx_events_lead_occurred
ON events (lead_id, occurred_at DESC);

CREATE INDEX idx_notifications_lead_created
ON notification_logs (lead_id, created_at DESC);
```

### 8.3 Dashboard Counts by Status

Scenario:

- Count current leads by status.

Query:

```sql
SELECT status, COUNT(*)
FROM leads
WHERE archived_at IS NULL
GROUP BY status;
```

Index:

```sql
CREATE INDEX idx_leads_active_status
ON leads (status)
WHERE archived_at IS NULL;
```

### 8.4 Dashboard Lead Source Summary

Scenario:

- Show top sources for recent leads.

Query:

```sql
SELECT source, COUNT(*)
FROM leads
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY source
ORDER BY COUNT(*) DESC;
```

Index:

```sql
CREATE INDEX idx_leads_created_source
ON leads (created_at DESC, source);
```

### 8.5 Conversion Event Counts

Scenario:

- Count `cta_click`, `form_start`, `form_submit`, `booking_click` by date range.

Query:

```sql
SELECT event_type, COUNT(*)
FROM events
WHERE occurred_at >= $1 AND occurred_at < $2
GROUP BY event_type;
```

Indexes:

```sql
CREATE INDEX idx_events_occurred_type
ON events (occurred_at DESC, event_type);

CREATE INDEX idx_events_type_occurred
ON events (event_type, occurred_at DESC);
```

Use `idx_events_type_occurred` when filtering a small set of event types; use `idx_events_occurred_type` for date-first dashboard sweeps.

### 8.6 Campaign Performance

Scenario:

- Compare leads/events from UTM campaigns.

Indexes:

```sql
CREATE INDEX idx_events_campaign_occurred
ON events (campaign, occurred_at DESC)
WHERE campaign IS NOT NULL;

CREATE INDEX idx_leads_campaign_created
ON leads (campaign, created_at DESC)
WHERE campaign IS NOT NULL;
```

### 8.7 Session Journey

Scenario:

- Debug one visitor/session path before a lead submission.

Index:

```sql
CREATE INDEX idx_events_session_occurred
ON events (session_id, occurred_at ASC)
WHERE session_id IS NOT NULL;
```

### 8.8 Notification Retry Queue

Scenario:

- Find failed/pending notifications that need retry.

Query:

```sql
SELECT *
FROM notification_logs
WHERE status IN ('pending', 'failed')
  AND next_retry_at <= NOW()
ORDER BY next_retry_at ASC
LIMIT 100;
```

Index:

```sql
CREATE INDEX idx_notifications_retry
ON notification_logs (status, next_retry_at ASC)
WHERE status IN ('pending', 'failed');
```

### 8.9 Appointment Calendar View

Scenario:

- Show appointments for a date range.

Indexes:

```sql
CREATE INDEX idx_appointments_confirmed_range
ON appointments (confirmed_start_at ASC, confirmed_end_at ASC)
WHERE status = 'confirmed';

CREATE INDEX idx_appointments_status_created
ON appointments (status, created_at DESC);
```

### 8.10 Review Request Follow-Up

Scenario:

- Find review requests pending send or awaiting feedback.

Indexes:

```sql
CREATE INDEX idx_review_requests_status_created
ON review_requests (status, created_at DESC);

CREATE INDEX idx_review_requests_lead_created
ON review_requests (lead_id, created_at DESC);
```

### 8.11 Intake Review Queue

Scenario:

- Admin reviews new intake submissions.

Indexes:

```sql
CREATE INDEX idx_intake_status_created
ON intake_submissions (status, created_at DESC);

CREATE INDEX idx_intake_lead_created
ON intake_submissions (lead_id, created_at DESC);
```

### 8.12 JSONB Field Search

Use JSONB indexes sparingly. Do not index every dynamic field.

Recommended only after a real query exists:

```sql
CREATE INDEX idx_leads_custom_fields_gin
ON leads USING GIN (custom_fields);

CREATE INDEX idx_intake_answers_gin
ON intake_submissions USING GIN (answers);
```

Rule: add JSONB GIN indexes only for paid workflows where admin searches/filtering need dynamic fields.

## 9. SQLite MVP Indexes

SQLite does not support partial indexes in older versions and lacks JSONB. For local demo use:

```sql
CREATE INDEX IF NOT EXISTS idx_leads_last_activity ON leads(last_activity_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status_last_activity ON leads(status, last_activity_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_source_created ON leads(source, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_type_timestamp ON events(event_type, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_events_lead_timestamp ON events(lead_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_lead_created ON notification_logs(lead_id, created_at DESC);
```

SQLite is for demo/small deployments only. PostgreSQL is the target once customer data becomes important.

## 10. API Design

### 10.1 Public APIs

```text
POST /api/leads
POST /api/events
POST /api/quote-requests
POST /api/appointment-requests
POST /api/intake-submissions
```

Principles:

- Public APIs validate consent.
- Public APIs rate-limit by IP/session in production.
- Public APIs never expose admin fields.
- Every successful conversion writes an event.

### 10.2 Admin APIs

```text
GET /api/admin/leads
GET /api/admin/leads/{lead_id}
PATCH /api/admin/leads/{lead_id}
POST /api/admin/leads/{lead_id}/notes
GET /api/admin/dashboard
GET /api/admin/events
GET /api/admin/notifications
POST /api/admin/exports/leads
```

Principles:

- Require admin auth or `ADMIN_API_KEY` in MVP.
- Support pagination from day one.
- Avoid returning huge event payloads by default.

### 10.3 Integration APIs

```text
POST /api/webhooks/calendar
POST /api/webhooks/email
POST /api/webhooks/review
GET /api/exports/leads.csv
POST /api/integrations/webhook/test
```

Integrations should be opt-in per client.

## 11. Pagination and Filtering Contract

Admin list endpoints should follow this shape:

```text
GET /api/admin/leads?status=new&source=google&limit=50&cursor=...
```

Response:

```json
{
  "items": [],
  "next_cursor": "opaque-cursor-or-null"
}
```

Do not rely on offset pagination for large event tables. Prefer cursor based on `(last_activity_at, lead_id)` or `(occurred_at, event_id)`.

## 12. Migrations

Use deterministic module migrations:

```text
packages/backend/dandelion_core/database/migrations/
  0001_core_leads_events.sql
  0002_notifications.sql
  0003_appointments.sql
  0004_review_requests.sql
```

Each client project runs migrations locally during deployment.

Rules:

- Migrations are append-only after client projects use them.
- Never edit an applied migration; add a new one.
- Include both PostgreSQL migrations and simplified SQLite migrations if SQLite remains supported.
- Every module declares required migration versions.

## 13. Module Dependencies

```text
events: no dependency
leads: depends on events
notifications: depends on events, leads
admin_crm: depends on leads, events, notifications
dashboard: depends on leads, events
quote: depends on leads, events, notifications
appointment: depends on leads, events, notifications, calendar integration optional
review: depends on leads, events, notifications
intake: depends on leads, events, files optional
```

No module should depend on a client website.

## 14. Security and Privacy

Minimum:

- Admin API key or auth required for admin routes.
- Public form rate limiting before production.
- Consent stored with submitted form.
- Analytics event metadata must avoid raw PII.
- File upload disabled unless explicitly enabled.
- Data export path documented per client.
- Backups configured per client deployment.

Sensitive industries:

- Do not store medical record details.
- Do not store legal case strategy details.
- Do not store financial account details.
- Use intake prompts that minimize sensitive data.

## 15. Implementation Order

### Iteration A: Extract Current MVP

- Extract Lead model/schema/repository/router.
- Extract Event model/schema/repository/router.
- Extract Notification mock adapter.
- Extract Admin dashboard query service.
- Keep `clients/dandelion` behavior unchanged.

### Iteration B: Configurable Forms

- Build frontend `FormRenderer`.
- Build backend generic submission adapter.
- Move Audit and HVAC Quote to config-driven fields.

### Iteration C: Admin CRM Lite Package

- Extract LeadList, LeadDetail, DashboardCards.
- Add pagination and status filters.
- Add event timeline per lead.

### Iteration D: Integrations

- Email provider adapter.
- CSV export.
- Webhook outbound integration.
- Calendar click/webhook integration.

### Iteration E: Production Hardening

- PostgreSQL migrations.
- Rate limiting.
- Auth provider integration.
- Backup/restore runbook.
- Monitoring hooks.

## 16. Acceptance Criteria For Architect

The architecture is acceptable when:

- A new client project can enable Lead + Event + Admin modules without copying backend logic.
- A new industry form can be added by config, not by editing core modules.
- Client deployments remain independent and can use separate databases.
- Dashboard queries use documented indexes.
- Public and admin APIs are separated.
- Mature SaaS capabilities remain integrations, not rebuilt heavy systems.
- Current Dandelion website can be migrated to shared modules without changing user-facing behavior.

