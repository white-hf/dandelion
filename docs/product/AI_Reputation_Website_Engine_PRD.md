# AI Reputation Website Engine PRD

**文档版本:** 1.0
**创建日期:** 2026-05-22
**Owner:** Dandelion
**状态:** Draft for Development
**相关文档:** [Product Strategy](Product_Strategy.md), [Business Operations Playbook](../business/AI_Reputation_Website_Operating_Playbook.md), [Architecture Proposal V4](../technical/Architecture_Proposal_V4.md), [Iteration Plan](../delivery/Iteration_Plan.md)

---

## 1. Product Goal

为“有真实口碑但没有专业网站”的本地小企业，自动生成、部署和维护一个专业、移动端友好、可接单的网站。

第一版必须完成：

> 从合规发现潜在客户，到生成 preview site，到部署验证，到发送合规 outreach，到客户付款授权后正式上线的最小闭环。

## 2. Users

### 2.1 Business Owner

本地服务小企业老板，特点：

- 有 Google Maps 或类似平台评价。
- 没有网站，或网站极弱。
- 没时间写文案、做设计、配置系统。
- 对低价、快速上线、少沟通敏感。

### 2.2 Dandelion Operator

一人公司操作者，特点：

- 需要每周批量发现、生成、验证和联系潜在客户。
- 不能人工深度沟通每个 prospect。
- 需要清晰的合规边界、审核队列和可复用模板。

### 2.3 Website Visitor

潜在消费者，特点：

- 从搜索、地图、社交、推荐进入。
- 想快速判断商家是否可信、服务是否匹配、如何联系。

## 3. Core Jobs To Be Done

### 3.1 For Business Owner

当我已经有好评但没有网站时，我希望不用花大量时间沟通，就能得到一个专业网站，让客户更容易信任和联系我。

### 3.2 For Dandelion Operator

当我寻找客户时，我希望系统能合规识别高潜力商家、生成 preview、部署验证并准备个性化 outreach，这样我可以用一人公司的成本运营建站业务。

## 4. MVP Scope

### 4.1 Prospect Discovery

输入：

- 地区，例如 `Halifax, NS`
- 行业，例如 `cleaning`, `landscaping`, `mobile detailing`
- 最低评分
- 最低评价数量
- website 缺失或弱网站规则

输出：

- prospect list
- business name
- category
- location
- public profile URL
- website status
- rating/review count if available from compliant source
- phone/email if legally usable
- confidence score
- compliance status

必须支持人工审核，不允许完全自动发送。

### 4.2 Reputation Intake

系统从合规来源采集或导入：

- business name
- category
- service area
- phone
- opening hours
- public description
- selected public photos if permitted
- review themes if permitted
- review snippets only when source/license/permission allows

第一版允许：

- operator 手动导入公开信息；
- 使用官方 API 或授权方式；
- 使用客户购买后提供的素材。

第一版禁止：

- 违反 Google Maps Terms 的 scraping/export/cache。
- 未授权复制 Google reviews/photos 到正式站点。

### 4.3 AI Business Profile Generator

输入：

- prospect intake data
- industry template
- location
- selected style

输出：

- brand positioning draft
- homepage headline
- service section copy
- trust summary
- CTA copy
- FAQ
- SEO title/description
- preview disclaimer
- missing information checklist

### 4.4 Website Template Engine

MVP 模板必须支持：

- single-page Starter site
- hero
- trust strip
- services
- review/theme summary
- photo gallery
- service area
- contact/quote form
- phone CTA
- FAQ
- footer privacy/disclaimer

模板配置字段：

```yaml
business:
  name:
  category:
  city:
  service_area:
  phone:
  email:
  profile_url:
  website_status:
brand:
  style:
  primary_color:
  tone:
content:
  headline:
  subheadline:
  services:
  trust_points:
  review_themes:
  faqs:
media:
  photos:
  logo:
conversion:
  primary_cta:
  form_key:
  notification_email:
compliance:
  preview_disclaimer:
  content_source_notes:
  authorization_status:
```

### 4.5 Preview Deployment

每个 preview 必须：

- 部署到 Dandelion preview domain。
- 使用 preview disclaimer。
- 不允许被搜索引擎索引。
- 不声称客户已合作。
- 自动运行 build。
- 自动运行 route smoke。
- 自动运行 form smoke with test mode。
- 生成 preview report。

### 4.6 Outreach Assistant

系统生成 draft outreach，但第一版必须人工审核后发送。

邮件必须包含：

- Dandelion 真实身份。
- 为什么联系对方。
- preview link。
- 明确说明 preview 未经授权、只是样例。
- 不夸大合作关系。
- 退订或不再联系选项。

### 4.7 Purchase And Authorization

客户购买前必须完成：

- 选择 plan。
- 接受 service agreement。
- 授权使用 business name、logo、照片、评价或客户提供素材。
- 确认 contact details。
- 付款 setup fee。
- 配置 monthly subscription。

### 4.8 Launch

正式上线必须支持：

- domain setup or temporary subdomain
- production disclaimer removal
- privacy page
- contact form live mode
- notification destination
- backup
- uptime monitor
- launch checklist

## 5. Non-Goals

MVP 不做：

- 完全自动 scraping Google Maps。
- 完全自动群发邮件。
- 多租户 SaaS 自助控制台。
- 复杂 CRM。
- 深度 SEO 内容运营。
- 客户无限设计修改。
- 支付、电商、预约日历深度集成。

## 6. Functional Requirements

### FR1 Prospect Record

系统必须能保存 prospect：

- `id`
- `business_name`
- `category`
- `location`
- `profile_url`
- `source`
- `website_url`
- `website_status`: `none | weak | social_only | directory_only | good | unknown`
- `rating`
- `review_count`
- `photo_count`
- `phone`
- `email`
- `status`: `discovered | reviewed | preview_generated | contacted | replied | won | lost | do_not_contact`
- `compliance_notes`
- `created_at`
- `updated_at`

### FR2 Website Status Classifier

规则：

- no website link => `none`
- Facebook/Instagram/Linktree only => `social_only`
- directory listing only => `directory_only`
- broken/parked/very old one-pager => `weak`
- modern site with service pages/contact/reviews => `good`

`good` prospects 不进入 Starter outreach 队列。

### FR3 Template Selection

系统必须根据行业选择模板：

- cleaning
- landscaping
- mobile detailing
- beauty/wellness
- pet services
- generic local service

未知行业进入 `generic local service`。

### FR4 Content Generation

AI 输出必须带来源说明：

- generated from public business category
- generated from review themes
- generated from operator notes
- generated from client-provided content

正式上线前不允许保留不可授权来源内容。

### FR5 Preview Site Generation

每个 preview site 必须拥有：

- unique slug
- noindex meta
- preview disclaimer
- build status
- smoke status
- last generated timestamp

### FR6 Lead Capture

preview 表单必须使用 test mode，不通知 prospect。

正式上线后表单必须：

- 保存 lead。
- 发送 email notification。
- 记录 event。
- 支持 CSV export。

### FR7 Billing State

客户状态：

- `prospect`
- `preview_sent`
- `trial_review`
- `customer_pending_payment`
- `active_customer`
- `paused`
- `cancelled`

## 7. Data Model Draft

### prospects

| Column | Type | Index | Notes |
| --- | --- | --- | --- |
| id | uuid | pk | prospect id |
| business_name | varchar(255) | idx | search |
| category | varchar(120) | idx | industry filtering |
| city | varchar(120) | idx | geography filtering |
| region | varchar(120) | idx | province/state |
| source | varchar(80) | idx | google_maps, directory, manual |
| source_url | text | no | profile/source URL |
| website_url | text | no | detected website |
| website_status | varchar(40) | idx | none/weak/social_only/directory_only/good |
| rating | decimal(2,1) | idx | when legally available |
| review_count | int | idx | when legally available |
| photo_count | int | no | optional |
| phone | varchar(60) | no | business contact |
| email | varchar(255) | no | if available/verified |
| status | varchar(60) | idx | pipeline status |
| compliance_status | varchar(60) | idx | allowed/review_needed/blocked |
| do_not_contact | boolean | idx | suppression |
| notes | text | no | operator notes |
| created_at | datetime | idx | |
| updated_at | datetime | idx | |

Suggested composite indexes:

- `(city, category, website_status, review_count)`
- `(status, compliance_status, updated_at)`
- `(do_not_contact, status)`

### preview_sites

| Column | Type | Index | Notes |
| --- | --- | --- | --- |
| id | uuid | pk | |
| prospect_id | uuid | fk, idx | prospects.id |
| slug | varchar(160) | unique | preview URL |
| template_key | varchar(80) | idx | |
| style_key | varchar(80) | idx | |
| config_json | json | no | generated site config |
| content_sources_json | json | no | source notes |
| build_status | varchar(40) | idx | pending/passed/failed |
| smoke_status | varchar(40) | idx | pending/passed/failed |
| published_url | text | no | |
| noindex | boolean | no | true for previews |
| created_at | datetime | idx | |
| updated_at | datetime | idx | |

### outreach_events

| Column | Type | Index | Notes |
| --- | --- | --- | --- |
| id | uuid | pk | |
| prospect_id | uuid | fk, idx | |
| preview_site_id | uuid | fk, idx | |
| channel | varchar(40) | idx | email/manual/phone |
| status | varchar(40) | idx | draft/sent/replied/bounced/unsubscribed |
| subject | varchar(255) | no | |
| body | text | no | |
| sent_at | datetime | idx | |
| reply_at | datetime | idx | |
| unsubscribe_at | datetime | idx | |

## 8. Acceptance Criteria

MVP 通过标准：

- 能手动或半自动导入 20 个 prospects。
- 能筛选出无网站/弱网站且评价好的 prospects。
- 能为至少 5 个 prospects 生成 preview site。
- 每个 preview site 自动 build + smoke pass。
- preview 页面有 noindex 与 unofficial disclaimer。
- 能生成合规 outreach draft。
- 至少 1 个 demo 能完成从 preview 到 active customer 的模拟流程。
- 所有正式上线内容都有授权状态记录。

## 9. Open Risks

- Google Maps / review/photo 使用限制导致自动内容来源受限。
- 冷邮件可能触发 spam 风险，必须低量、人工审核、符合 CASL/CAN-SPAM。
- 客户可能担心未经请求生成 preview 冒犯；必须清楚标注 unofficial preview。
- 自动生成内容可能夸大服务能力；需要 safety checklist。
- 客户付款后仍可能要求定制，合同必须限制 scope。

## 10. Development Priority

1. Prospect data model + manual import.
2. Website status classifier.
3. Starter template config schema.
4. AI content generator prompt contract.
5. Preview site renderer.
6. Preview deployment + smoke.
7. Outreach draft generator.
8. Purchase/authorization checklist.
9. Active customer launch workflow.
