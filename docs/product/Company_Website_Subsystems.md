# 公司官网子系统设计

**文档版本:** 1.0  
**编写日期:** 2026-05-17  
**产品:** Dandelion Growth Systems 公司官网  
**目标:** 将公司官网实现为第一个轻量运营闭环产品，而不是静态宣传页。

---

## 1. 子系统总览

官网 MVP 应同时设计和开发以下子系统：

| 子系统 | MVP 是否必须 | 业务目的 |
| --- | --- | --- |
| Marketing Site | 必须 | 解释定位、建立信任、驱动 CTA |
| Audit Request / Lead Capture | 必须 | 获取潜在客户信息 |
| Event Tracking | 必须 | 记录访问、CTA、表单和 booking 行为 |
| Notification System | 必须 | 新线索及时通知内部 owner |
| Basic Admin CRM | 必须 | 查看线索、更新状态、记录备注 |
| Booking Integration | 必须 | 引导 discovery call，MVP 用外部链接 |
| Demo System | 必须 | 展示完整业务闭环 |
| Conversion Dashboard | MVP 轻量 | 展示线索、来源、CTA、转化事件 |
| Content/Industry Pack System | V1 | 支持快速复制行业页面和 Demo |
| Review Booster Simulation | V1 | 用于演示服务后索评，不先做完整自动化 |
| Client Portal / Intake | Later | 用于真实客户项目，不进入官网 MVP |
| Payments / Subscription | Later | 付费客户后再接 Stripe |

## 2. MVP 业务闭环

第一版必须跑通：

1. 访客进入首页或行业页。
2. 访客点击 `Get a Free Growth Audit`。
3. 访客提交 audit request form。
4. 系统创建 lead。
5. 系统写入 event。
6. 系统发送内部邮件通知。
7. 内部 admin 查看 lead。
8. 内部 admin 更新状态和备注。
9. 访客或销售点击 booking CTA。
10. Dashboard 显示基础转化数据。

## 3. 子系统细化

### 3.1 Marketing Site

Owner: Conversion UI Lead  
MVP 页面：

- Home
- Services
- Industry Solutions
- Demo
- Pricing
- Contact / Audit

核心组件：

- Hero
- Problem section
- Business loop diagram
- Industry pack cards
- Demo preview
- Why not template / why not heavy SaaS
- Process steps
- Pricing snapshot
- Trust/local section
- CTA band

验收标准：

- 30 秒内表达“不是普通网站公司”。
- 每个关键页面都有 primary CTA。
- 移动端优先。
- CTA click 写入 event。

### 3.2 Audit Request / Lead Capture

Owner: Operations Backend Lead + Conversion UI Lead  
MVP 表单字段：

- business_name
- contact_name
- email
- phone
- website_url
- industry
- city
- current_problem
- monthly_lead_goal
- marketing_channels
- consent

Lead status:

- new
- contacted
- audit_scheduled
- audit_sent
- proposal_sent
- won
- lost
- archived

验收标准：

- 必填字段校验。
- 邮箱格式校验。
- consent 必须记录。
- 成功后显示下一步说明。
- 后端保存 lead。
- 触发 `audit_form_submit` event。
- 触发内部通知。

### 3.3 Event Tracking

Owner: Operations Backend Lead + QA/Growth Analyst  
事件类型：

- page_view
- cta_click
- audit_form_start
- audit_form_submit
- demo_view
- pricing_view
- booking_click
- admin_status_update
- notification_sent
- notification_failed

事件字段：

- event_id
- event_type
- timestamp
- path
- referrer
- source
- medium
- campaign
- session_id
- visitor_id
- lead_id
- metadata

隐私原则：

- event 不存储非必要 PII。
- lead_id 可关联业务数据，但 analytics event 本身保持轻量。
- UTM 和来源用于销售复盘。

验收标准：

- 关键 CTA 有事件。
- 表单 start/submit 有事件。
- booking click 有事件。
- dashboard 能读取事件汇总。

### 3.4 Notification System

Owner: Operations Backend Lead  
MVP 渠道：

- Email only: Mailgun / SendGrid / SMTP adapter。

触发条件：

- 新 audit request。
- notification failure。
- 后续可加入 booking confirmation 和 review request。

通知内容：

- Lead summary。
- Website URL。
- Current problem。
- Source/UTM。
- Admin link。
- Suggested next action。

验收标准：

- 新 lead 创建后 1 分钟内发送通知。
- 发送成功/失败写入 event。
- 失败不阻塞 lead 保存。
- 本地开发可使用 mock adapter。

### 3.5 Basic Admin CRM

Owner: Conversion UI Lead + Operations Backend Lead  
MVP 页面：

- Login / protected access
- Lead list
- Lead detail
- Status update
- Notes
- Basic event timeline

Lead list columns:

- created_at
- business_name
- contact_name
- industry
- city
- source
- status
- last_activity

验收标准：

- Admin 不公开。
- 可以查看 lead。
- 可以更新 status。
- 可以添加 notes。
- 可以看到 lead 相关 event。

### 3.6 Booking Integration

Owner: Product Manager + DevOps/SRE  
MVP：

- 外部 Calendly 或 Google Appointment Schedule。

数据记录：

- booking_click event。
- URL source/UTM。

V1：

- booking webhook 或手动导入 booking result。

验收标准：

- CTA 清晰。
- 跳转可靠。
- 点击可追踪。

### 3.7 Demo System

Owner: Product Manager + Conversion UI Lead  
MVP Demo narrative：

> A local HVAC business gets traffic from Google Ads. A visitor requests a quote. The owner receives a notification. The lead appears in the admin view. Follow-up and review request are shown as the next workflow.

Demo 必须标记：

- Real in MVP
- Mocked for demonstration
- Planned for V1

验收标准：

- 客户不需要销售解释也能理解闭环。
- Demo 页面展示 visitor view 和 business owner view。
- Demo 不误导客户以为未实现功能已上线。

### 3.8 Conversion Dashboard

Owner: QA/Growth Analyst + Operations Backend Lead  
MVP cards：

- Total leads
- Audit form submissions
- Booking clicks
- Top source/medium
- CTA clicks
- Lead status counts

V1 cards：

- Lead response time
- Demo view to audit submit
- Pricing view to booking click
- 30-day trend

验收标准：

- Dashboard 能回答：本周有多少线索、来自哪里、处于什么状态。
- 不做复杂 BI。
- 数据来自 event 和 lead records。

### 3.9 Content / Industry Pack System

Owner: Product Manager + Conversion UI Lead  
V1 目标：

- 使用配置驱动行业页面。
- 快速复制 HVAC、Dental、Immigration 等页面。

配置字段：

- industry_name
- pain_points
- primary_cta
- services
- trust_signals
- demo_story
- form_variant

验收标准：

- 新行业页面不需要重写核心布局。
- 行业差异来自内容、字段和 workflow。

## 4. 数据模型 MVP

### 4.1 Lead

```text
lead_id
created_at
updated_at
business_name
contact_name
email
phone
website_url
industry
city
current_problem
monthly_lead_goal
marketing_channels
source
medium
campaign
status
consent
notes_count
last_activity_at
```

### 4.2 LeadNote

```text
note_id
lead_id
created_at
author
body
```

### 4.3 Event

```text
event_id
event_type
timestamp
path
referrer
source
medium
campaign
session_id
visitor_id
lead_id
metadata_json
```

### 4.4 AdminUser

```text
admin_user_id
email
password_hash_or_external_identity
role
created_at
last_login_at
```

### 4.5 NotificationLog

```text
notification_id
lead_id
type
channel
recipient
status
provider_message_id
error_message
created_at
sent_at
```

## 5. API Contract MVP

### Public APIs

```text
POST /api/leads
POST /api/events
```

### Admin APIs

```text
GET /api/admin/leads
GET /api/admin/leads/{lead_id}
PATCH /api/admin/leads/{lead_id}
POST /api/admin/leads/{lead_id}/notes
GET /api/admin/dashboard
```

### Internal APIs

```text
POST /api/internal/notifications/lead-created
```

## 6. MVP Build Order

1. Static marketing site shell。
2. Audit form UI with validation。
3. Lead API and persistence。
4. Event API and tracking hooks。
5. Email/mock notification adapter。
6. Basic admin lead list/detail。
7. Dashboard cards。
8. Demo page showing the loop。
9. QA, accessibility, privacy and launch pass。

## 7. Own / Integrate / Avoid

| Capability | Decision | MVP Choice |
| --- | --- | --- |
| Marketing website | Own | Build in Next.js |
| Audit lead capture | Own | FastAPI endpoint |
| Event tracking | Own | Lightweight event table |
| Email notification | Integrate | Mailgun/SendGrid/SMTP adapter |
| Booking | Integrate | External calendar link |
| Admin CRM Lite | Own | Basic internal dashboard |
| Review automation | Mock in demo | V1 after lead loop |
| SMS | Later integrate | Not MVP |
| Payments | Later integrate | Stripe later |
| Heavy CRM/FSM | Avoid | Export/webhook later |

## 8. Development Acceptance Criteria

MVP can be considered complete when:

- Homepage and core pages render on desktop and mobile.
- Audit form creates a lead.
- Lead submission sends or mocks notification.
- Event tracking records CTA and form events.
- Admin can view and update leads.
- Dashboard shows basic counts.
- Demo page explains the business loop.
- Privacy and accessibility smoke tests pass.
- Local demo can be started reliably.

