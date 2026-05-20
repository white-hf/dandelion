# 公司官网 PRD

**文档版本:** 1.2
**编写日期:** 2026-05-17
**最近更新日期:** 2026-05-20
**产品名称:** Dandelion Growth Systems
**产品类型:** 公司官网 + 第一个业务运营闭环 Demo
**目标用户:** 北美本地服务型 SMB owner / operator
**相关文档:** [Customer Website Experience Standard](Customer_Website_Experience_Standard.md), [Company Website Subsystems](Company_Website_Subsystems.md), [Agent Readiness Assessment](Agent_Readiness_Assessment.md), [Product Strategy](Product_Strategy.md)

---

## 1. 背景

公司官网不能只是品牌展示页。它必须成为第一个产品，用来证明我们的核心主张：

> A website is only useful if it turns visitors into booked jobs, consultations, quote requests, reviews, and follow-up actions.

官网要展示我们如何帮助本地 SMB 把线上流量变成可跟进的业务结果。它也必须成为未来客户网站的质量基准：专业、好看、可信、手机端顺畅、CTA 明确、表单简单。

## 2. 目标

### 2.1 商业目标

- 让访问者在 30 秒内理解：我们不是普通网站公司。
- 获取 discovery call 和 free audit 线索。
- 展示“网站 + 预约/报价 + Lead Inbox + review + conversion snapshot”的闭环。
- 作为 cold outreach 后的落地页，提高回复和预约率。
- 作为未来行业 Demo 的设计和技术基准。

### 2.2 产品目标

- 建立一个可复用的 high-quality customer website shell。
- 建立清晰的视觉系统、版式系统和移动端体验标准。
- 接入 lead capture API。
- 建立 event tracking。
- 建立最小 Lead Inbox。
- 建立邮件通知流程。
- 建立一个可演示的轻量运营闭环，作为未来客户网站的标准样板。

## 3. 目标用户

### 3.1 Primary User

本地服务型 SMB owner，通常具备这些特点：

- 团队 1-20 人。
- 依赖 Google、推荐、广告或社区口碑获客。
- 网站过时或只有模板站。
- 用 email、短信、Excel、纸质记录管理线索。
- 没有时间学习复杂 SaaS。

### 3.2 Secondary User

合作伙伴：

- Google Ads freelancer
- SEO consultant
- 本地 IT/MSP
- 摄影/品牌设计师
- 会计师、保险顾问、移民顾问等 referral partner

## 4. 核心信息架构

### 4.1 页面结构

- Home
- Services
- Industry Solutions
- Demo
- Pricing
- About
- Resources
- Contact / Book a Call

### 4.2 首页结构

1. Hero
2. Problem
3. Business Loop
4. Industry Packs
5. Demo Preview
6. Services and Modules
7. Why Not Wix / Why Not Heavy SaaS
8. Process
9. Pricing Snapshot
10. Trust and Local Positioning
11. Final CTA

## 4.3 网站体验原则

官网必须先像一个优秀客户网站，再像一个产品 Demo。页面体验优先级：

1. 可信：访问者立刻觉得这家公司专业、认真、懂本地 SMB。
2. 清楚：30 秒内知道服务对象、解决的问题、下一步动作。
3. 好看：视觉方向明确，不能像模板站或默认组件拼接。
4. 好用：移动端 CTA、表单、阅读节奏顺畅。
5. 可转化：每个页面都有明确 primary action，不堆砌功能。

具体设计标准见 [Customer Website Experience Standard](Customer_Website_Experience_Standard.md)。

## 5. 核心文案

### 5.1 Hero

Headline:

> Websites, booking, quotes, reviews, and follow-up systems for local service businesses.

Subheadline:

> We help North American SMBs turn website visitors and ad traffic into tracked leads, booked consultations, quote requests, reviews, and repeatable follow-up workflows.

Primary CTA:

> Get a Free Growth Audit

Secondary CTA:

> See the Demo

### 5.2 Differentiation

Core message:

> We are not a template website shop. We are not another complex SaaS platform. We configure a lightweight operating loop around your actual sales process.

### 5.3 Competitive Framing

Section title:

> More practical than a template. Lighter than enterprise software.

Bullets:

- Wix and Squarespace give you tools. We deliver the configured system.
- Heavy SaaS can be too much for small teams. We start with the workflow that gets you more leads and faster follow-up.
- Agencies often stop at launch. We stay involved through monthly optimization.

## 6. Functional Requirements

官网 MVP 的详细子系统、数据模型、API contract 和开发顺序见 [Company Website Subsystems](Company_Website_Subsystems.md)。本 PRD 定义产品目标和用户体验，子系统文档定义工程边界。

### 6.1 Lead Capture

Audit request form fields:

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

Acceptance criteria:

- Form validates required fields.
- Submission creates a lead record.
- Submission triggers email notification to internal owner.
- Submission shows success state.
- Submission writes event log.

### 6.2 Booking CTA

MVP option:

- External scheduling link, such as Calendly or Google Calendar appointment schedule.

Future option:

- Native Appointment Module.

Acceptance criteria:

- Booking CTA appears above fold and at page bottom.
- Click event is tracked.
- Booking page opens in a reliable flow.

### 6.3 Demo Flow

Demo page must show:

- Visitor landing page
- Quote or audit form
- Admin lead card
- Follow-up reminder
- Review request example
- Conversion dashboard preview

Acceptance criteria:

- Demo is understandable without a sales call.
- Demo includes at least one full user journey.
- Demo makes clear what is real MVP and what is roadmap.

### 6.4 Admin View

Minimum fields:

- lead_id
- created_at
- business_name
- contact_name
- email
- phone
- website_url
- industry
- status
- source
- notes

Acceptance criteria:

- Admin can list leads.
- Admin can view lead detail.
- Admin can update status and notes.
- Admin is not public.
- Admin must stay simpler than a CRM. It should help an owner know who to call next, not manage a complex sales pipeline.

### 6.5 Event Tracking

Events:

- page_view
- cta_click
- audit_form_start
- audit_form_submit
- demo_view
- pricing_view
- booking_click

Acceptance criteria:

- Events include timestamp, path, source, medium, campaign when available.
- Events are stored for dashboard/reporting.
- No unnecessary personal data is stored in analytics events.

## 7. Non-Functional Requirements

### 7.0 Website Experience Quality

- Visual direction cannot rely on generic SaaS sections, default component styling, or interchangeable cards.
- Each page must have a clear narrative rhythm: problem, offer, proof, process, action.
- Mobile viewport is the primary review target, not an afterthought.
- Forms must feel short and purposeful. Required fields must be defensible by business need.
- Every visual element must support trust, clarity, or conversion.

### 7.1 Performance

- Mobile-first.
- Fast initial load.
- Minimal third-party scripts.
- Images optimized.

### 7.2 Accessibility

- Semantic headings.
- Keyboard navigable forms.
- Labels for all form fields.
- Visible focus states.
- Contrast checked.
- ARIA only when semantic HTML is insufficient.

### 7.3 Privacy

- Data minimization.
- Clear form consent.
- Privacy-conscious analytics.
- Internal-only admin.
- Data export/delete path planned.

### 7.4 SEO

- Local service business keywords.
- Metadata for each page.
- Structured content for industry pages.
- Sitemap and robots.
- Open Graph metadata.

## 8. Technical Requirements

### 8.1 Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Responsive design
- Reusable section components

### 8.2 Backend

- FastAPI
- Lead API
- Event API
- Email notification integration
- Basic admin API

### 8.3 Data

Initial entities:

- Lead
- Event
- AdminUser
- Note

### 8.4 Deployment

MVP:

- Local Docker demo
- Caddy gateway
- Cloudflare Tunnel for sales demo

Production target:

- Frontend on Vercel / Cloudflare Pages / AWS Amplify
- API on AWS Lightsail / ECS
- PostgreSQL

## 8.5 Subsystems Required For MVP

必须同时设计和开发：

- Marketing Site
- Audit Request / Lead Capture
- Event Tracking
- Notification System
- Lead Inbox Lite
- Booking Integration
- Demo System
- Conversion Snapshot

暂不进入 MVP：

- Full client portal
- Native booking engine
- SMS automation
- Stripe subscription
- Heavy CRM/FSM
- Review automation production workflow

## 9. Scope

### 9.1 MVP In Scope

- Home page
- Services page
- Industry Solutions page with 3 verticals
- Demo page
- Pricing snapshot
- Contact/audit form
- Lead API
- Event tracking
- Email notification
- Basic admin lead list

### 9.2 Out of Scope

- Full self-serve SaaS onboarding
- Native payment subscription
- Complex workflow builder
- SMS automation
- Multi-user role management
- Full CRM pipeline
- Blog CMS
- Native calendar booking

## 10. Success Metrics

- Visitor to audit form submission rate
- Visitor to booking click rate
- Cold outreach landing page conversion
- Number of qualified discovery calls
- Demo page completion rate
- Time to build first industry variant

## 11. Launch Checklist

- Homepage live
- Audit form tested
- Email notification tested
- Event tracking tested
- Admin access protected
- Privacy notice published
- Accessibility smoke test completed
- Mobile QA completed
- Demo journey recorded or documented
- Pricing snapshot reviewed

## 12. Next Product After Website

After company website MVP, build:

> HVAC Lead Engine

Reason:

- Lower compliance risk than medical/legal.
- Quote request workflow is clear.
- Lead value is high.
- Demo can show measurable business value.
