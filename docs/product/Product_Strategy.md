# 产品战略文档

**文档版本:** 1.3
**编写日期:** 2026-05-17
**最近更新日期:** 2026-05-20
**产品定位:** 专业客户网站 + 轻量运营闭环服务
**第一产品:** 公司官网与获客闭环 Demo
**相关文档:** [Company Website PRD](Company_Website_PRD.md), [Customer Website Experience Standard](Customer_Website_Experience_Standard.md), [Company Website Subsystems](Company_Website_Subsystems.md), [Agent Readiness Assessment](Agent_Readiness_Assessment.md), [Shared Module System Design](../technical/Shared_Module_System_Design.md)

---

## 1. 产品总定位

本项目不是单纯网站工具，也不是通用 SaaS。产品形态必须收敛为：

> 专业客户网站 + 轻量运营闭环 + 可复用交付模块 + 持续优化服务。

客户购买的不是代码，而是一个能运行的业务闭环：访客进入、提交预约或报价、商家收到通知、后台跟进、服务后索评、dashboard 复盘转化。

但产品主角始终是客户网站。后台、表单、事件、通知、导出都只是让网站更有业务结果的支撑系统，不能演变成复杂 CRM 或中大型 SaaS。

产品体验参考 Google Docs 相对 Microsoft Word 的取舍：

- 不追求最强功能集合，追求客户最快理解、最快上线、最快使用。
- 不让 SMB owner 学系统，系统应该贴合他的真实工作流。
- 不把复杂配置暴露给客户，复杂度留在交付团队和共享模块内部。
- 宁可少做功能，也不能牺牲网站专业度、视觉质量、移动体验和线索转化。

## 2. 产品组合

### 2.1 Core Product: Customer Website Growth System

面向本地 SMB 的核心产品是一套高质量客户网站，并内置轻量业务闭环：

- Website as Front Door
- Conversion Landing Pages
- Quote Module
- Appointment Module
- Lead Inbox Lite
- Review Booster
- Simple Follow-up Notes
- Conversion Snapshot

命名上避免过早强调 `Operating System` 或 `CRM`，这些词容易让客户联想到复杂系统。面向客户时应表达为：

> A better website that helps you get, understand, and follow up with leads.

### 2.2 Service Product: Managed Growth

按月交付的运营服务：

- 托管与监控
- 小改动与活动 landing page
- 月度转化报告
- 表单和 CTA 优化
- 自动化流程调整
- 评价增长和本地 SEO 建议

### 2.3 Demo Product: Industry Packs

行业包用于销售演示和快速交付：

- HVAC Lead Engine
- Dental Booking & Review System
- Immigration Consultation Intake System
- Contractor Quote Follow-up System
- Realtor Listing Lead System

## 3. 第一产品：自己的公司官网

自己的官网必须先成为第一个产品，而不是普通宣传页。它要同时完成三个目标：

- 对外获客：清楚说明我们为谁解决什么问题，驱动 discovery call。
- 对内验证：用自己的 Lead CRM、booking、dashboard 和 review/intake 流程。
- 对客户演示：客户访问官网时能看到完整业务闭环，而不是只听概念。

第一产品名称建议：

> Dandelion Growth Systems

备选表达：

- Local Business Growth Systems
- Booking, Quote & Review Systems for Local Service Businesses
- More than a website: a lightweight operating system for local SMBs

## 4. 产品原则

### 4.1 结果优先

每个功能必须服务至少一个业务结果：

- 更多预约
- 更多 quote request
- 更快线索跟进
- 更多 Google reviews
- 更清晰广告转化
- 更低人工运营成本

### 4.2 轻量优先

不做成熟 SaaS 已经做深的重型系统。坚持 Own / Integrate / Avoid：

- Own: professional website experience、lead capture、quote request、appointment request、review request、conversion snapshot。
- Integrate: email、SMS、calendar、payments、analytics、第三方 CRM/FSM。
- Avoid: dispatching、payroll、inventory、EMR、legal case management、ERP。

### 4.3 客户网站优先

每个版本必须先问：

- 这个能力是否让客户网站更专业、更可信、更容易转化？
- 是否降低了 SMB owner 的操作负担？
- 是否能在 7-10 天内复用到下一个客户网站？
- 是否避免了“功能很多但客户不会用”的 SaaS 化陷阱？

如果答案是否定的，应推迟或删除。

### 4.4 服务先于 SaaS

早期不要做 self-serve SaaS。先用服务交付验证客户愿意为哪些模块付费，再抽象为产品。

### 4.5 行业化优先

不要卖通用模块，卖行业结果：

- HVAC 不买 CRM，买更多 quote request 和更快 follow-up。
- 诊所不买 automation，买预约和 review 增长。
- 律所不买表单，买咨询预约和 intake 效率。

## 5. 产品路线图

### Phase 0: Direction Reset and Positioning

目标：明确不与重型 SaaS 拼功能，而是用专业网站和轻量闭环赢得 SMB 客户。

输出：

- Business Plan
- Product Strategy
- Company Website PRD
- Customer Website Experience Standard
- Architecture Proposal
- Competitive Analysis
- AI Agents Workflow

### Phase 1: Company Website Experience MVP

目标：把自己的官网做成第一个高质量客户网站样板，而不是普通宣传页。

核心能力：

- 专业视觉方向
- 高转化首页与行业页
- 移动优先操作体验
- 清晰 CTA 和信任构建
- 服务/行业页面
- Discovery call booking CTA
- Free website and operations audit form
- Lead capture API
- Simple admin view
- Email notification
- Conversion event log

### Phase 2: Website Experience System

目标：沉淀客户网站的设计、内容、组件和 QA 标准，让每个客户项目都能专业、好看、易用。

优先抽象：

- Industry homepage pattern
- Service page pattern
- Trust/proof section pattern
- Quote/booking CTA pattern
- Mobile interaction checklist
- Visual QA checklist
- Before/after demo narrative

### Phase 3: First Industry Demo Pack

目标：基于网站体验系统复制第一个行业 Demo。

建议优先：

- HVAC Lead Engine

原因：

- 线索价值高
- 报价流程明确
- 客户痛点清晰
- 避免医疗和法律高合规风险

### Phase 4: Paid Pilot

目标：找到 1-2 个真实付费客户，验证价格、交付周期和月费价值。

最低成功标准：

- 至少 1 个客户支付 setup fee。
- 至少 1 个客户接受 monthly maintenance/growth retainer。
- Demo 到上线不超过 7-10 天。
- 模块复用率超过 60%。

### Phase 5: Module Extraction

目标：将重复功能抽象为可配置模块。

优先抽象：

- Lead schema
- Quote form schema
- Notification hooks
- Event tracking
- Lead inbox cards
- Monthly report template

## 6. 产品成功指标

### 6.1 公司官网指标

- 网站访客到 audit form 提交率
- 网站访客到 booking click rate
- Discovery call booking 数
- Cold outreach 访问后的回复率
- Demo page 停留时间

### 6.2 模块指标

- 每个模块复用次数
- 每个模块交付工时
- 每个模块客户付费意愿
- 每个模块 bug 数
- 每个模块是否带来月费留存

### 6.3 商业指标

- Setup fee
- MRR
- Close rate
- Delivery cycle
- Gross margin by project
- Retention after 90 days

## 7. 当前产品优先级

第一优先级不是继续扩展后台模块，而是完成：

1. 公司官网 PRD。
2. 客户网站体验标准。
3. 公司官网作为第一个高质量客户网站样板。
4. Lead capture + audit request + booking CTA。
5. 简单 Lead Inbox 和邮件通知。
6. HVAC Lead Engine Demo。

只有当自己的官网能清楚展示“网站 + 业务闭环”时，外部客户才容易理解并愿意付费。

## 8. 第一产品子系统策略

公司官网 MVP 不是单页面项目，而是最小运营闭环。必须优先实现这些子系统：

- Marketing Site: 负责表达定位和驱动 CTA。
- Audit Request / Lead Capture: 负责把访客变成线索。
- Event Tracking: 负责记录转化路径。
- Notification System: 负责让内部 owner 及时跟进。
- Lead Inbox Lite: 负责查看和管理线索。
- Booking Integration: 负责把意向客户转成 discovery call。
- Demo System: 负责向客户展示我们为他们提供的闭环。
- Conversion Snapshot: 负责证明网站不是展示页，而是可复盘的业务系统。

这个结构要成为未来客户交付的默认骨架。客户差异主要通过行业内容、表单字段、CTA、集成和 follow-up workflow 配置体现，而不是每次重写系统。

## 9. 共享模块产品策略

后台产品不作为中心化多租户 SaaS 起步，而是作为一套公司内部维护的共享模块库。

原则：

- 每个客户网站独立部署。
- 每个客户有独立数据库和环境变量。
- 客户项目通过代码引用共享模块，而不是复制粘贴。
- 模块通过 config/schema/copy/theme/workflow 表达差异。
- 通用能力沉淀到 `packages/`，客户个性化保留在 `clients/`。

优先沉淀模块：

- Lead Core
- Event Tracking
- Notification
- Lead Inbox Lite
- Conversion Snapshot
- Form Schema Engine
- Industry Workflow Config
- Export / Integration
