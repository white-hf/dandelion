
# 北美 SMB 业务运营闭环平台 - 架构方案书 (V4.0)
## AI 驱动的网站、运营自动化与增长交付体系

**文档版本:** 2.3 (Business Operations Edition)
**编写日期:** 2026-05-17
**项目位置:** `/Users/whitetang/Desktop/work/website`
**核心市场:** 加拿大及美国本地服务型中小企业 (SMB)
**相关文档:** [Product Strategy](../product/Product_Strategy.md), [Company Website PRD](../product/Company_Website_PRD.md), [Company Website Subsystems](../product/Company_Website_Subsystems.md), [Shared Module System Design](Shared_Module_System_Design.md), [Business Plan](../business/Business_Plan.md)

---

## 1. 核心战略理念

本方案从“多客户网站 Demo 托管平台”升级为“北美 SMB 业务运营闭环平台”。网站仍然是客户第一触点，但商业价值不止于页面展示，而是通过软件模块帮助客户完成获客、预约、报价、跟进、评价增长和复购。

核心目标：

*   **前台高转化:** 用 Next.js 构建行业化、高信任、移动端优先的网站与 landing page。
*   **后台轻运营:** 用 FastAPI 提供预约、报价、线索 CRM、评价请求、客户 intake 等可复用模块。
*   **持续增长:** 用 dashboard 和月度报告帮助客户看到线索、预约、报价、评价和广告转化。
*   **本地信任:** 采用加拿大/美国部署、隐私意识设计、无障碍最佳实践和本地化文案。

技术战略必须服务商业定位：我们不是重造 Wix、GoHighLevel、Jobber、ServiceTitan、Clio 或 Jane，而是在它们之间提供轻量、可配置、可服务化交付的业务闭环。成熟 SaaS 已经解决得很深的领域，优先集成，不优先自研。

当前架构不采用中心化多租户 SaaS。后台能力应抽象为共享模块库，由每个客户网站项目按需引用并独立部署。详细代码级设计、数据模型和索引见 [Shared Module System Design](Shared_Module_System_Design.md)。

## 2. 技术栈架构 (Localized Tech Stack)

### 2.1 交互与视觉层 (Frontend)
*   **核心框架:** **Next.js (TypeScript)**
*   **样式方案:** **Tailwind CSS**
*   **动画与特效:** **Framer Motion**
*   **前端产品形态:**
    *   Marketing Website: 首页、服务页、案例、FAQ、评价、联系方式。
    *   Conversion Landing Page: 面向 Google Ads / Meta Ads 的单目标转化页。
    *   Client Portal: 客户 intake、文件上传、预约状态、消息入口。
    *   Admin Dashboard: 线索、预约、报价、评价请求与转化数据。
*   **本地化增强:** 
    *   **多语言支持 (i18n):** 内置 Next-intl，支持加拿大英/法双语切换（满足魁北克省或联邦业务需求）。
    *   **无障碍辅助 (Accessibility):** 采用 WCAG-informed 实践，覆盖语义结构、键盘导航、对比度、表单标签、ARIA 审查。

### 2.2 业务逻辑层 (Backend)
*   **API 框架:** **Python FastAPI**
*   **核心业务模块:**
    *   Lead API: 表单、电话点击、广告来源、UTM、线索状态。
    *   Appointment API: 可用时间、预约、取消、重约、提醒。
    *   Quote API: 行业字段、报价区间、线索评分、商家通知。
    *   Review API: 服务后索评、私有反馈、Google Review 引导。
    *   Intake API: 客户资料、文件上传、咨询前问卷。
    *   Dashboard API: 转化漏斗、月度报告、模块使用数据。
*   **本地化集成:** 预集成 **Stripe**（支付/订阅）、**Mailgun/SendGrid**（邮件）、未来可接入 Twilio（短信）、Google Calendar、Google Reviews、Google Analytics/Search Console。
*   **数据原则:** 最小化采集、按租户隔离、敏感字段加密、审计日志、可导出、可删除。
*   **边界原则:** 不构建重型派工、工资、库存、医疗 EMR、法律 case management 或复杂会计系统。相关需求通过集成、导出或合作伙伴解决。

### 2.3 基础设施与部署 (Cloud Infrastructure)
*   **本地 Demo 环境:** Mac 本地 Docker + Caddy + Cloudflare Tunnel。
*   **北美生产部署 (AWS Optimization):**
    *   **数据驻留:** 优先选择 **AWS ca-central-1 (Central Canada)** 或 **us-east-1 (N. Virginia)**，确保数据符合加拿大 **PIPEDA (个人信息保护与电子文档法案)** 或美国各州隐私法。
    *   **边缘加速:** 结合 Cloudflare 边缘计算，确保从多伦多、温哥华到纽约、旧金山的访问延迟均低于 100ms。
*   **推荐生产形态:**
    *   前端: Vercel / Cloudflare Pages / AWS Amplify，按客户需求选择。
    *   API: AWS ECS/Fargate 或 Lightsail 起步，成熟后迁移 ECS + RDS。
    *   数据库: PostgreSQL，早期可单实例多租户，后期按客户等级拆分。
    *   文件: S3-compatible object storage，按租户路径隔离。
    *   监控: Uptime monitor、错误日志、API latency、表单失败告警。

## 3. 北美市场专项设计规范

*   **审美趋向:** 强调干净的排版 (Typography)、大量的留白 (White Space) 和极简的导航。
*   **行动导向 (Conversion):** AI 将针对北美用户习惯生成明确的 Call-to-Action (CTA) 按钮，如 "Get a Quote" 或 "Book a Consultation"。
*   **信任构建:** 预留本地评价系统（如 Google Reviews / Yelp 集成）的 API 接口，增加客户转化率。
*   **运营闭环:** 每个页面必须明确下一步动作，并将动作写入线索系统，避免只有展示没有跟进。
*   **行业字段:** 不同行业使用不同 intake schema，例如 HVAC 关注房屋类型、设备、紧急程度；律所关注案件类型、时间线、地区；诊所关注服务、保险、自选时间。

## 4. 模块化产品架构

### 4.1 Tenant Layer

每个客户作为一个 tenant：

*   tenant_id
*   industry
*   domain
*   enabled_modules
*   locale
*   brand profile
*   compliance profile
*   billing plan

### 4.2 Module Layer

模块必须遵守统一接口：

*   schema: 行业字段定义
*   frontend component: 可嵌入页面或 portal
*   API routes: CRUD 和业务动作
*   notification hooks: 邮件、短信、日历、webhook
*   reporting events: 用于 dashboard 和月报

### 4.3 Template Layer

行业模板不是简单页面模板，而是一组完整业务流程：

*   HVAC: landing page + quote form + lead CRM + follow-up reminder
*   Clinic: website + appointment + review request + no-show reminder
*   Law/Immigration: consultation booking + intake form + document upload
*   Realtor: property lead form + showing request + CRM status pipeline

### 4.4 Integration Layer

集成层用于避免重造成熟 SaaS：

*   Calendar: Google Calendar / Microsoft Calendar，用于预约同步。
*   Email: Mailgun / SendGrid，用于通知、提醒、索评。
*   SMS: Twilio 或等价服务，用于高价值客户提醒和 follow-up。
*   Analytics: Google Analytics、Search Console、广告转化事件。
*   Payments: Stripe，用于订阅、deposit 或简单付款。
*   CRM/FSM export: CSV、webhook 或 Zapier-style integration，方便连接 Jobber、Housecall Pro、HubSpot、GoHighLevel 等工具。

### 4.5 Service Boundary

每个模块必须标记边界：

*   Own: 我们长期维护的轻量核心能力。
*   Integrate: 通过第三方工具完成，不深度自研。
*   Avoid: 不进入的重型功能区。

示例：

| 领域 | 决策 | 原因 |
| --- | --- | --- |
| Quote request and lead capture | Own | 获客闭环核心，复用率高 |
| Appointment request and reminder | Own + Integrate | 自有体验，日历同步走集成 |
| Dispatching and route optimization | Avoid | 成熟 FSM 更强，开发成本高 |
| Medical records / EMR | Avoid | 高合规风险，不符合当前商业定位 |
| Legal case management | Avoid | 垂直 SaaS 成熟，风险高 |
| Review request workflow | Own | 本地服务商价值明确，轻量可控 |
| Email/SMS sending infrastructure | Integrate | 第三方更稳定，合规能力更强 |

## 5. AI 协同开发工作流

1.  **业务诊断:** 分析客户行业、客单价、获客渠道、线索流程、当前运营瓶颈。
2.  **闭环设计:** 先画出客户从访问、咨询、预约/报价、跟进、成交、评价到复购的流程。
3.  **模块选择:** 根据业务瓶颈选择 Appointment、Quote、CRM Lite、Review Booster 或 Client Intake。
4.  **接口契约:** 后端先定义 schema、API、事件和数据权限。
5.  **前端实现:** 前端基于行业模板实现 marketing pages、conversion flow 和 dashboard。
6.  **合规自检:** 检查无障碍、隐私声明、cookie/analytics、数据最小化和表单 consent。
7.  **Demo 交付:** 通过 Cloudflare Tunnel 或 staging URL 发送可体验 Demo。
8.  **上线监控:** 上线后监控表单、邮件、预约、API、页面速度和错误日志。
9.  **月度优化:** 基于真实数据优化 CTA、表单长度、landing page、自动化提醒和评价流程。

## 6. 商业竞争力 (North America Edge)

1.  **本地化信任优势:** 你在加拿大本地工作，理解本地商业习惯与法律合规，这是海外低价外包无法比拟的护城河。
2.  **从页面到业务结果:** 竞争对手卖网站，本项目卖预约、报价、线索跟进、评价增长和运营效率。
3.  **模块复用带来毛利:** 每个行业模块复用次数越多，交付成本越低，客户体验越稳定。
4.  **月费收入结构:** 托管、监控、报告、内容更新和自动化优化形成 recurring revenue。
5.  **AI 驱动的高效迭代:** 面对北美客户周期性的促销活动或信息更新，AI 能快速完成代码、文案和流程调整。

## 7. 竞争防御型技术原则

1.  **不做通用平台:** 不构建复杂 workflow builder，避免与 GoHighLevel/HubSpot 正面竞争。
2.  **不做重型行业系统:** 不构建 FSM、EMR、case management、ERP 或会计系统。
3.  **模块先服务化，再产品化:** 先用产品化服务验证客户愿意付费，再抽象为共享模块。
4.  **Dashboard 只展示关键结果:** 线索、预约、报价、review、来源和响应时间，避免做成复杂 BI。
5.  **API 先事件化:** 每个用户动作都写入 event log，方便后续 dashboard、automation 和客户月报。
6.  **客户可退出:** 数据可导出，降低早期客户对小供应商的信任阻力。

## 8. 技术路线优先级

### Phase 0: Company Website as First Product

*   先构建公司官网，作为第一个真实产品和销售 Demo。
*   官网必须包含 Lead Capture、Audit Request、Booking CTA、Event Tracking 和 Basic Admin View。
*   官网代码应成为后续行业 Demo 的 marketing shell 和 conversion flow 基准。
*   不先构建完整 SaaS 平台，避免在没有客户验证前过度工程化。
*   具体 MVP 子系统、数据模型和 API contract 以 [Company Website Subsystems](../product/Company_Website_Subsystems.md) 为准。

### Phase 1: Productized Service MVP

*   完成 3 个行业 Demo。
*   搭建 Lead API、Quote API、Appointment API 的最小版本。
*   每个客户仍可独立 Docker demo，方便销售演示。
*   完成 Integration Layer 的最小邮件、日历和 analytics 接口。

### Phase 2: Shared Module Platform

*   抽取共用 tenant config、schema config、notification hooks。
*   建立统一 dashboard。
*   建立标准上线 checklist 和监控。
*   增加 webhook/export，让客户可接入现有 SaaS。

### Phase 3: Vertical SaaS Readiness

*   当某行业达到 10-20 个付费客户后，判断是否独立 SaaS 化。
*   增加 self-serve onboarding、billing、role-based access、audit logs。
*   将服务型交付逐步转为配置型交付。
*   仅对高复用、高毛利、低合规风险模块 SaaS 化。
