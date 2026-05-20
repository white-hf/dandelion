# 北美 SMB 业务运营闭环平台 - 商业计划书

**文档版本:** 1.1  
**编写日期:** 2026-05-17  
**项目定位:** AI 驱动的本地 SMB 获客、转化、运营自动化服务  
**目标市场:** 加拿大与美国本地中小企业，优先从安大略省和大多伦多地区切入
**相关文档:** [Product Strategy](../product/Product_Strategy.md), [Company Website PRD](../product/Company_Website_PRD.md), [Architecture Proposal V4](../technical/Architecture_Proposal_V4.md), [Competitive Analysis](../market/Competitive_Analysis.md)

---

## 1. 战略判断

只做网站会进入低门槛、强竞争、低复购的市场。正确方向不是成为另一个网站外包工作室，而是把网站作为客户业务入口，向后连接预约、报价、线索管理、评价增长、客户跟进和复购。

本项目的核心商业定位是：

> 为北美本地 SMB 提供一个轻量、可负担、可快速上线的业务运营闭环：高转化网站 + 行业自动化模块 + 托管维护 + 持续增长优化。

AI 的角色不是对外销售噱头，而是内部交付杠杆。客户购买的是更多预约、更多报价请求、更快跟进、更可信的品牌形象和更低运营成本。

本项目必须避免两个错误定位：

- 不做低价网站工厂，因为会被 Wix、Squarespace、WordPress agency 和海外外包压低利润。
- 不做通用 SaaS，因为会被 GoHighLevel、Jobber、Housecall Pro、ServiceTitan、Clio、Jane 等成熟平台拖入功能军备竞赛。

正确位置是：

> 介于 agency 和 SaaS 之间的产品化运营服务商。

## 2. 市场依据

### 2.1 市场足够大

美国 SBA 2025 small business profile 显示，美国约有 3,618 万小企业。加拿大 ISED 2025 Key Small Business Statistics 显示，中小企业是加拿大私营部门就业的核心来源。  

参考来源：

- SBA Office of Advocacy 2025 U.S. Small Business Profile: https://advocacy.sba.gov/wp-content/uploads/2025/06/United_States_2025-State-Profile.pdf
- ISED Key Small Business Statistics 2025: https://ised-isde.canada.ca/site/sme-research-statistics/en/key-small-business-statistics

### 2.2 SMB 真正痛点不是“没有网站”

多数本地商家的真实问题是：

- 客户从 Google、广告、社交媒体进入后，没有形成可追踪线索。
- 预约、报价、邮件、短信和客户资料分散在多个工具里。
- 网站无法证明专业性、合规性、服务质量和客户信任。
- 花了广告费，但无法判断哪些渠道带来真实成交。
- 评价增长、售后跟进、复购提醒依赖人工，执行不稳定。

### 2.3 合规与信任是北美差异化入口

安大略省 AODA 网站无障碍要求引用 WCAG 2.0 Level AA。加拿大 PIPEDA 规范商业活动中个人信息处理。  

参考来源：

- Ontario AODA website accessibility: https://www.ontario.ca/page/how-make-websites-accessible
- Office of the Privacy Commissioner of Canada, PIPEDA: https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/

商业表达必须谨慎：对外使用 "accessibility-focused", "WCAG-informed", "privacy-conscious implementation"，不要未经审计承诺“完全合规”。

## 3. 目标客户

### 3.1 第一优先级：本地高价值服务业

这些行业单个线索价值高，愿意为转化率和跟进效率付费：

- HVAC、屋顶、装修、清洁、园林、搬家、汽车维修
- 牙医、理疗、心理咨询、美容、私营诊所
- 律所、移民顾问、会计师、房产经纪、保险顾问

### 3.2 暂不优先服务的客户

- 只想花几百美元买静态页面的客户。
- 需要复杂原生 App、ERP 或深度行业系统的客户。
- 要求低价无限修改、没有明确业务目标的客户。
- 涉及复杂医疗数据、金融风控或高度监管数据处理但没有预算做合规审计的客户。

## 4. 竞争定位

### 4.1 竞争地图

| 竞争类型 | 代表玩家 | 强项 | 弱点 | 我们的切入方式 |
| --- | --- | --- | --- | --- |
| 自助建站平台 | Wix, Squarespace | 便宜、模板多、托管一体化 | 客户要自己配置，业务结果不可控 | 不卖工具，卖配置完成的业务闭环 |
| 营销自动化平台 | GoHighLevel, HubSpot Starter | CRM、funnels、email/SMS automation | 学习成本高，普通 SMB 用不起来 | 把自动化包装成行业结果，不展示复杂 builder |
| 家政/现场服务 SaaS | Jobber, Housecall Pro, ServiceTitan | 报价、派工、调度、发票、支付 | 对小团队可能过重，迁移和配置成本高 | 做获客层、报价请求、线索跟进，不做全套 FSM |
| 专业行业 SaaS | Clio, Jane, SimplePractice | 法律/诊所专业工作流强 | 不专注获客网站、广告转化和品牌体验 | 做 marketing/intake layer，必要时集成而非替代 |
| 本地 web agency | Local agencies | 本地信任、服务感 | 软件能力弱、交付慢、月费价值模糊 | 用模块化软件和 AI 提高交付速度与月费价值 |
| 海外外包 | Fiverr, offshore devs | 低价 | 沟通、本地审美、合规、售后弱 | 强调北美本地理解、隐私意识和长期运营 |

### 4.2 我们的优势

- **服务补齐 SaaS 最后一公里:** 很多 SMB 不缺工具，缺的是有人帮他们设计、配置、上线和持续优化。
- **业务闭环而非单点软件:** 网站、landing page、预约、报价、CRM Lite、评价和 dashboard 作为一套流程交付。
- **轻量定制:** 80% 模块化，20% 行业、品牌和流程定制，兼顾毛利和客户感知。
- **AI 交付效率:** AI 用于内部提高 Demo、文案、页面、API、dashboard 和月报交付速度。
- **北美本地信任:** 加拿大时区、英语/中文沟通、AODA/PIPEDA 意识、北美审美和本地部署选项。

### 4.3 我们的弱势

- **品牌信任弱:** 早期不如成熟 SaaS 和本地老牌 agency，需要用行业 Demo、SLA、备份和数据导出降低客户顾虑。
- **功能深度不足:** 不应承诺替代 Jobber、ServiceTitan、Clio、Jane 等成熟业务系统。
- **合规风险:** 医疗、法律、金融行业只做获客、预约、intake 和前台转化，不碰核心监管工作流。
- **交付失控风险:** 每个客户都深度定制会退化为低毛利外包，必须套餐化和模块化。

### 4.4 个性化竞争力

对外品牌表达应围绕：

> Local SMB Growth Operator: 懂北美本地服务业、懂技术、懂转化、懂运营，把客户散乱的线上业务串成可执行系统。

推荐英文表达：

- We do not just build websites. We build booking, quote, review, and follow-up systems for local service businesses.
- A website is only useful if it turns visitors into booked jobs, consultations, or quote requests.
- Built for small teams that are not ready for heavy enterprise software but need more than a template website.
- Local, fast, privacy-conscious, and designed around your actual sales process.

## 5. 产品线

### 5.1 Website as Front Door

高转化网站是前台入口，必须服务于业务结果：

- 行业定位清晰的首页
- 服务页和本地 SEO landing page
- 明确 CTA：Book, Get a Quote, Request Consultation
- Google Reviews / Yelp / Testimonials 展示
- 移动端优先
- 基础性能、SEO、无障碍与隐私实践

### 5.2 Operations Modules

模块必须可复用、可配置、可按月收费：

- Appointment Module: 预约、取消、重约、邮件/短信提醒、日历同步
- Quote Module: 多步骤需求采集、报价区间、线索评分、商家通知
- Lead CRM Lite: 线索来源、状态、跟进提醒、备注、成交金额
- Review Booster: 服务后自动索评、私有反馈分流、Google Review 引导
- Client Intake Portal: 表单、文件上传、进度状态、客户消息
- Conversion Dashboard: 表单、电话、预约、广告来源和转化漏斗

### 5.3 Managed Growth Service

月费服务是利润核心：

- 托管、监控、安全更新
- 每月小改动和活动 landing page
- 转化数据报告
- SEO 内容建议
- 自动化流程优化
- 无障碍和隐私基础检查

## 6. 套餐与定价

### 6.1 Launch Package

**价格:** CAD 1,500-2,500 一次性 + CAD 99-199/月  
**适合:** 小型本地商家、个人顾问、刚起步业务  
**包含:**

- 5 页以内高转化网站
- 基础 SEO、表单、Analytics/Search Console
- 托管、备份、基础维护
- 一个轻量 CTA 流程

### 6.2 Growth Package

**价格:** CAD 3,500-7,500 一次性 + CAD 249-499/月  
**适合:** 高线索价值服务业、专业服务、诊所类客户  
**包含:**

- Launch Package 全部内容
- 一个核心运营模块：预约、报价、CRM Lite 或 Review Booster
- 转化追踪 dashboard
- 每月内容/页面优化额度
- Google Reviews 展示与索评流程

### 6.3 Premium Operations Package

**价格:** CAD 8,000-15,000+ 一次性 + CAD 750-1,500/月  
**适合:** 多地点商家、专业服务团队、预算明确的高信任行业  
**包含:**

- Growth Package 全部内容
- 多语言、客户门户、复杂表单、文件上传
- 数据驻留与隐私设计
- SLA、监控、月度运营复盘
- 人工辅助无障碍与隐私检查报告

## 7. 获客策略

### 7.1 第一阶段：垂直行业 Demo 驱动

先制作 3 个行业样板：

- HVAC Lead Engine: Quote + Lead CRM + follow-up reminder
- Dental Booking & Review System: Appointment + no-show reminder + Review Booster
- Immigration Consultation Intake System: Consultation booking + intake + document upload

每个 Demo 必须展示：

- 移动端真实体验
- 从访客提交到商家跟进的业务流程闭环
- 后台线索/预约视图
- 转化 dashboard 原型
- 速度、SEO、无障碍基础检查截图
- 服务完成后的 review request 流程

### 7.2 第二阶段：本地外呼和冷邮件

目标名单来源：

- Google Maps 本地行业搜索
- 商会、行业协会、社区 business directory
- Yelp、HomeStars、BBB、专业协会目录
- 已投广告但 landing page 弱的本地商家

核心话术：

> 我们不是单纯做网站。我们帮本地服务商把 Google 流量、广告线索、预约、报价、评价和跟进串成一个闭环。可以先给你做一份免费网站与转化审计，并附一个 48 小时可体验的行业 Demo。

禁用话术：

- “我们做高端网站。”
- “我们用 AI 帮你建站。”
- “我们可以定制任何系统。”

推荐话术：

- “你现在的问题不是网站，而是线索来了之后没有被系统化跟进。”
- “我们帮你把 Google 流量变成可追踪的预约和报价请求。”
- “你不用学习复杂 SaaS，我们直接帮你配置并运营一套适合你行业的轻量系统。”

### 7.3 第三阶段：合作渠道

优先建立这些合作：

- Google Ads freelancer
- 本地会计师、保险顾问、移民顾问
- 商会和行业协会
- 摄影、品牌设计、SEO 顾问
- IT support / MSP 公司

## 8. 交付 SOP

1. **Discovery:** 30 分钟业务访谈，确认客户行业、服务、客单价、获客渠道、当前痛点。
2. **Audit:** 输出一页网站/转化/运营审计。
3. **Demo:** 48 小时内给出可点击 Demo，不先陷入长方案。
4. **Proposal:** 用 Launch/Growth/Premium 三档报价，不做无限定制报价。
5. **Build:** 使用标准模块配置行业字段、品牌、内容和流程。
6. **Launch:** 域名、托管、Analytics、Search Console、表单、备份、监控上线。
7. **Optimize:** 30 天内根据真实线索数据调整 CTA、表单、页面和自动化流程。
8. **Retain:** 月度报告 + 小优化 + 新 landing page，推动长期月费。

## 9. KPI

### 9.1 销售 KPI

- Cold outreach to reply rate
- Reply to discovery call rate
- Discovery to paid audit/demo rate
- Demo to close rate
- Average contract value
- Monthly recurring revenue

### 9.2 交付 KPI

- Demo 交付时间
- 正式上线周期
- 每单人工小时
- 模块复用率
- 客户修改轮次
- 上线后 30 天 bug 数

### 9.3 客户结果 KPI

- 表单提交数
- 预约数
- Quote request 数
- 电话点击数
- Google Review 增长
- 广告 landing page 转化率
- 线索平均响应时间

## 10. 市场动态迭代机制

每月执行一次商业复盘，不凭感觉调整方向。

### 10.1 每月更新内容

- 目标行业线索质量：哪个行业回复率、成交率、客单价最高。
- 竞争报价：本地 agency、Wix/Squarespace、行业 SaaS 的价格变化。
- 合规变化：AODA、ADA、PIPEDA、州隐私法、短信营销规则。
- 技术变化：AI 工具、CRM、预约、支付、邮件、短信 API 成本。
- 客户结果：哪些模块真正提升预约、报价、评价或复购。

### 10.2 决策规则

- 连续 20 个有效外呼没有回复，调整行业或话术。
- 连续 5 个客户都不愿意为某模块付费，降级为赠品或删除。
- 某行业 3 单以上成交且毛利健康，制作行业标准包。
- 某模块复用超过 5 次，产品化为内部组件。
- 某行业出现 10-20 个付费客户，再考虑独立 SaaS 化。
- 如果客户反复要求成熟 SaaS 已解决的深功能，优先集成或转介绍，不自研。
- 如果某行业主要竞争对手已高度成熟且客户付费意愿弱，停止深耕。

## 11. 12 周执行路线

### Week 1-2: 定位与样板

- 完成 3 个垂直行业 Demo 的业务流程图。
- 建立 Launch/Growth/Premium 报价单。
- 准备一页 audit 模板和 cold email 模板。
- 为每个行业 Demo 写清楚“替代谁、不替代谁、集成谁”。
- 完成公司官网作为第一产品的 PRD，并将官网作为所有销售 Demo 的入口。

### Week 3-4: MVP 模块

- 开发 Quote Module MVP。
- 开发 Appointment Module MVP。
- 开发 Lead CRM Lite MVP。
- 定义与 Google Calendar、Google Analytics/Search Console、Mailgun/SendGrid 的最小集成边界。
- 先在公司官网中实现 Lead Capture、Audit Request、Event Tracking 和 Basic Admin View。

### Week 5-6: 首批获客

- 每周外呼/邮件 100 个本地商家。
- 每周至少 5 个 discovery call。
- 争取 1-2 个低折扣付费试点，不做永久免费。

### Week 7-8: 交付与优化

- 交付首批客户。
- 记录每单人工小时、客户修改点、模块复用率。
- 建立上线 checklist 和运营月报模板。

### Week 9-10: 行业聚焦

- 根据回复率和成交率选择第一个主攻行业。
- 将该行业 Demo、话术、报价和模块字段标准化。
- 开始建立合作渠道。
- 对比该行业主流 SaaS，明确我们只做获客层、intake 层或转化层。

### Week 11-12: 月费化

- 将维护、监控、报告、优化和自动化打包为月费。
- 复盘首批客户实际结果。
- 决定下一季度继续扩行业，还是深耕一个行业。

## 12. 当前最重要的判断

短期不要做通用 SaaS，不要做低价网站工厂，也不要主推原生 App。最优路径是：

> 产品化服务起步，模块化软件提高客单价，行业复用提高毛利，客户数量验证后再 SaaS 化。
