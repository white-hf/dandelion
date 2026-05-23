
# AI Reputation Website Engine - 架构方案书 (V5.0)
## AI 驱动的口碑资产到专业网站生成、部署与托管体系

**文档版本:** 3.0 (AI Reputation Website Engine Edition)
**编写日期:** 2026-05-17
**最近更新日期:** 2026-05-22
**项目位置:** `/Users/whitetang/Desktop/work/website`
**核心市场:** 有真实口碑但没有专业网站的本地服务型 SMB
**相关文档:** [Product Strategy](../product/Product_Strategy.md), [AI Reputation Website Engine PRD](../product/AI_Reputation_Website_Engine_PRD.md), [Operating Playbook](../business/AI_Reputation_Website_Operating_Playbook.md), [Shared Module System Design](Shared_Module_System_Design.md), [Business Plan](../business/Business_Plan.md)

---

## 1. 核心战略理念

本方案从“北美 SMB 业务运营闭环平台”收窄为更适合一人公司冷启动的 **AI Reputation Website Engine**。

网站仍然是客户第一触点，但第一阶段不追求替换已有强网站，也不构建复杂 SaaS。核心目标是：

> 合规发现无网站但有真实口碑的本地商家，自动生成 unofficial preview website，客户付款授权后正式上线，并由 Dandelion 托管维护。

核心目标：

*   **Prospect Discovery:** 合规记录候选商家、评分、网站状态、行业和联系状态。
*   **Reputation Analysis:** 将公开且允许使用的信息、operator notes、客户授权素材转化为结构化网站配置。
*   **Preview Generation:** 基于行业模板生成带 disclaimer 和 noindex 的预览站。
*   **Activation Workflow:** 客户付款、签署授权、确认信息后切换为正式站点。
*   **Managed Maintenance:** 托管、表单、备份、监控、小改动和授权内容更新。

技术战略必须服务商业定位：我们不是重造 Wix、GoHighLevel、Jobber、ServiceTitan，也不是做 Google Maps scraper。我们构建的是可审计、可授权、可部署、可维护的 AI 网站生成流程。

当前架构不采用中心化多租户 SaaS。后台能力应抽象为共享模块库，由每个客户网站项目按需引用并独立部署。详细代码级设计、数据模型和索引见 [Shared Module System Design](Shared_Module_System_Design.md)。

## 2. 技术栈架构 (Localized Tech Stack)

### 2.1 交互与视觉层 (Frontend)
*   **核心框架:** **Next.js (TypeScript)**
*   **样式方案:** **Tailwind CSS**
*   **动画与特效:** **Framer Motion**
*   **前端产品形态:**
    *   Dandelion Marketing Website: 对外销售与产品说明。
    *   Preview Website Renderer: 为 prospect 生成 unofficial preview。
    *   Activated Customer Website: 客户付款授权后的正式网站。
    *   Operator Console: prospect、preview、outreach、customer activation 管理。
*   **本地化增强:**
    *   **多语言支持 (i18n):** 内置 Next-intl，支持加拿大英/法双语切换（满足魁北克省或联邦业务需求）。
    *   **无障碍辅助 (Accessibility):** 采用 WCAG-informed 实践，覆盖语义结构、键盘导航、对比度、表单标签、ARIA 审查。

### 2.2 业务逻辑层 (Backend)
*   **API 框架:** **Python FastAPI**
*   **核心业务模块:**
    *   Prospect API: 候选商家、网站状态、评分、pipeline 状态、suppression。
    *   Preview Site API: 生成配置、构建状态、smoke 状态、preview URL。
    *   Content Source API: 记录内容来源、授权状态、平台限制和审核备注。
    *   Outreach API: 邮件草稿、发送状态、退订、回复记录。
    *   Activation API: service agreement、content authorization、billing state、launch checklist。
    *   Lead API: 正式站上线后的表单、电话点击、event 和 lead。
*   **本地化集成:** Stripe（支付/订阅）、Mailgun/SendGrid（邮件）、未来可接入 Twilio（短信）、Google Business Profile / Places API 仅在合规和授权范围内使用。
*   **数据原则:** 最小化采集、来源可追踪、授权状态可审计、suppression list、客户数据可导出、可删除。
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

## 3.1 AI Reputation Engine 专项规范

### 3.1.1 合规数据采集边界

允许：

*   人工记录公开 business facts，例如名称、类别、城市、电话、是否有网站。
*   使用官方 API 且遵守其 terms、attribution、retention、display rules。
*   使用客户付款后提供或授权的照片、评价、logo、服务描述。
*   使用平台嵌入或链接方式展示第三方资料。

禁止：

*   绕过 Google Maps / Google Business Profile 限制进行 scraping、export 或 cache。
*   未授权复制第三方平台 reviews/photos 到正式客户网站。
*   在 preview 中暗示客户已经授权或合作。
*   自动大规模发送未经审核的营销邮件。

### 3.1.2 Preview Site 安全要求

每个 preview site 必须：

*   `noindex,nofollow`。
*   显示 unofficial preview disclaimer。
*   使用 test-mode form。
*   不发送通知给 prospect。
*   记录所有内容来源。
*   支持一键下线或删除。

### 3.1.3 Activated Site 要求

客户付款授权后：

*   移除 preview disclaimer。
*   更新为正式 privacy notice。
*   切换 live form。
*   配置客户通知邮箱/手机号。
*   确认内容授权状态。
*   启用 uptime monitor 和备份。

## 4. 模块化产品架构

### 4.1 Tenant Layer

V3.0 中有两类对象：`prospect` 和 `customer`。不是每个 prospect 都是客户。

每个 prospect：

*   prospect_id
*   source
*   source_url
*   business_name
*   category
*   city/region
*   website_status
*   rating/review_count if legally available
*   compliance_status
*   outreach_status
*   do_not_contact

每个 active customer：

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

新增 V3.0 模块：

| Module | Own / Integrate / Avoid | 说明 |
| --- | --- | --- |
| Prospect Discovery | Own | 保存和筛选 prospect，不直接违法抓取 |
| Website Status Classifier | Own | 判断 no website / weak / social only / good |
| AI Content Generator | Own | 根据模板和来源生成网站 config |
| Preview Renderer | Own | 生成 noindex preview site |
| Outreach Draft Assistant | Own | 生成草稿，人工审核发送 |
| Email Sending | Integrate | 通过合规邮件工具 |
| Payment / Subscription | Integrate | Stripe |
| Google Reviews / Photos | Integrate / Client Authorized | 严格遵守平台规则和授权 |
| Mass Scraping | Avoid | 平台和法律风险高 |
| Mass Cold Email Automation | Avoid | spam 和品牌风险高 |

### 4.3 Template Layer

行业模板不是简单页面模板，而是一组完整业务流程：

*   Cleaning: reputation homepage + services + before/after gallery + request form
*   Landscaping: seasonal service homepage + gallery + quote CTA
*   Mobile detailing: package/service homepage + booking request
*   Beauty/wellness: trust-focused homepage + service menu + appointment request
*   Pet grooming: friendly local homepage + gallery + appointment request
*   Generic local service: fallback template for early experiments

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

1.  **Prospect Discovery:** 按区域和行业发现候选商家。
2.  **Compliance Filter:** 判断是否允许使用该数据、是否可联系、是否应加入 suppression。
3.  **Website Status Classification:** 识别 no website、social only、directory only、weak、good。
4.  **Preview Config Generation:** AI 生成结构化网站 config，不直接写死页面。
5.  **Content Source Audit:** 每个内容块记录来源和授权状态。
6.  **Preview Build:** 生成 noindex preview site。
7.  **Smoke QA:** 自动验证 route、CSS、表单 test mode、disclaimer。
8.  **Outreach Draft:** AI 生成邮件草稿，人审核后发送。
9.  **Activation:** 客户签署协议、授权内容、付款，切换 live site。
10. **Maintenance:** 托管、备份、监控、授权内容更新。

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

### Phase 1: AI Reputation Website MVP

*   建立 prospect、preview_site、outreach、activation 数据模型。
*   完成手动/半自动 prospect import。
*   完成 website status classifier。
*   完成 Starter Reputation Site template renderer。
*   完成 preview deployment + smoke。
*   完成 outreach draft assistant。
*   完成 Stripe/payment + authorization checklist 的运营闭环。

### Phase 2: Activated Customer Site Platform

*   正式客户站点支持独立域名、live form、通知和备份。
*   抽取客户网站 config schema。
*   增加 email/SMS lead alert。
*   增加客户授权素材更新 workflow。
*   增加 operator console。

### Phase 3: Productized Scale

*   当某行业达到 10-20 个付费客户后，固化行业模板。
*   增加 self-serve client review flow。
*   增加批量 preview 生成队列。
*   增加月度 AI update report。
*   仅对高复用、低风险能力 SaaS 化。
