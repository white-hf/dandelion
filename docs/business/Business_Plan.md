# AI Reputation Website Engine - 商业计划书

**文档版本:** 2.0
**编写日期:** 2026-05-17
**最近更新日期:** 2026-05-22
**项目定位:** 面向有真实口碑但没有专业网站的本地 SMB 的 AI 网站生成与托管服务
**目标市场:** 加拿大 Atlantic Canada 起步，优先 Halifax / Dartmouth / Bedford 本地服务业
**相关文档:** [Product Strategy](../product/Product_Strategy.md), [AI Reputation Website Engine PRD](../product/AI_Reputation_Website_Engine_PRD.md), [Operating Playbook](AI_Reputation_Website_Operating_Playbook.md), [Architecture Proposal V4](../technical/Architecture_Proposal_V4.md), [Competitive Analysis](../market/Competitive_Analysis.md)

---

## 1. 战略判断

只做传统网站会进入低门槛、强竞争、低复购的市场。但对一人公司冷启动而言，直接切入复杂运营闭环或替换已有强网站同样不现实。

本项目的核心商业定位是：

> 为已经拥有真实口碑但没有专业网站的本地 SMB，自动生成、部署并托管一个专业、移动端友好、可接单的网站。

AI 的角色不是只做内部提效，而是客户可见的产品能力：发现口碑资产、生成 preview website、总结评价主题、生成页面内容、部署验证、持续辅助更新。

本项目必须避免两个错误定位：

- 不抢已有强网站客户，因为会进入传统建站、SEO、广告公司的主战场。
- 不做通用 SaaS 或重型运营系统，因为会被 GoHighLevel、Jobber、Housecall Pro、ServiceTitan 等成熟平台拖入功能军备竞赛。

正确位置是：

> AI Reputation Website Engine: 把本地商家的真实评价、照片和服务信息转化为产品化网站。

## 1.1 V2.0 Pivot: 从“运营闭环平台”收窄到“AI 口碑网站引擎”

此前方向强调“网站 + 运营自动化闭环”。该方向长期仍有价值，但对一人公司冷启动存在三个风险：

- 客户沟通成本高，容易退化为定制外包。
- 需要行业深度知识和复杂流程，验证周期长。
- 早期客户未必已经意识到运营系统价值，但能理解“我没有网站”。

因此 V2.0 的商业切入改为：

> 找到没有专业网站但已有真实口碑的本地商家，先用 AI 自动生成可体验的网站 preview，再通过低摩擦套餐转化为付费托管客户。

长期仍可向表单、通知、AI lead summary、review updates、landing pages 升级，但第一购买理由必须保持简单：专业网站。

## 2. 市场依据

### 2.1 市场足够大

美国 SBA 2025 small business profile 显示，美国约有 3,618 万小企业。加拿大 ISED 2025 Key Small Business Statistics 显示，中小企业是加拿大私营部门就业的核心来源。

参考来源：

- SBA Office of Advocacy 2025 U.S. Small Business Profile: https://advocacy.sba.gov/wp-content/uploads/2025/06/United_States_2025-State-Profile.pdf
- ISED Key Small Business Statistics 2025: https://ised-isde.canada.ca/site/sme-research-statistics/en/key-small-business-statistics

### 2.2 V2.0 细分市场的真正痛点是“有口碑但没有网站”

V2.0 不服务所有 SMB，而是服务一个更窄的市场：

- Google Maps / Facebook / Yelp / 本地目录上已有好评；
- 客户能搜到他们，但看不到一个专业、可信、可分享的网站；
- 老板不想花时间写文案、找设计、开会、反复改稿；
- 传统建站公司对他们太贵、太慢、太麻烦；
- 自助建站工具要求老板自己操作，实际很难完成。

Dandelion 的机会是把“已有口碑资产”自动转化成网站，而不是从零创造品牌。

### 2.3 合规与信任是北美差异化入口

安大略省 AODA 网站无障碍要求引用 WCAG 2.0 Level AA。加拿大 PIPEDA 规范商业活动中个人信息处理。

参考来源：

- Ontario AODA website accessibility: https://www.ontario.ca/page/how-make-websites-accessible
- Office of the Privacy Commissioner of Canada, PIPEDA: https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/

商业表达必须谨慎：对外使用 "accessibility-focused", "WCAG-informed", "privacy-conscious implementation"，不要未经审计承诺“完全合规”。

## 3. 目标客户

### 3.1 第一优先级：无网站但有口碑的本地服务业

冷启动优先：

- Cleaning / duct cleaning / heat pump cleaning
- Landscaping / lawn care / snow removal
- Mobile car detailing
- Handyman / home repair
- Pet grooming
- Beauty / spa / massage
- Small local contractors with good reviews and no website

### 3.2 暂不优先服务的客户

- 已有成熟网站、SEO 和广告体系的客户。
- 需要复杂原生 App、ERP 或深度行业系统的客户。
- 要求低价无限修改、没有明确业务目标的客户。
- 涉及复杂医疗数据、金融风控或高度监管数据处理但没有预算做合规审计的客户。
- 要求 Dandelion 非法抓取或复制平台内容的客户。

## 4. 竞争定位

### 4.1 竞争地图

| 竞争类型 | 代表玩家 | 强项 | 弱点 | 我们的切入方式 |
| --- | --- | --- | --- | --- |
| 自助建站平台 | Wix, Squarespace | 便宜、模板多、托管一体化 | 客户要自己配置、写文案、找图片 | 不卖工具，卖已经生成好的 preview 和托管上线 |
| AI/GBP 建站工具 | Goodsite, Brizy, Dorik, Simbasite, SiteBotPro, SiteDrop Pro | AI 生成、价格低、部分支持 GBP/profile 导入 | 多数仍是工具或模板站，质量同质化，客户仍需操作/判断 | 只做高质量 preview-first activation，客户不需要 builder |
| 口碑管理平台 | Birdeye, Podium, LocalReach | reviews、listings、messages、GBP 管理强 | 对“没有网站”的小商家可能过重或太贵 | 先解决独立网站和专业形象，再逐步增加轻量口碑/lead 能力 |
| 营销自动化平台 | GoHighLevel, HubSpot Starter | CRM、funnels、email/SMS automation | 学习成本高，普通 SMB 用不起来 | 把自动化包装成行业结果，不展示复杂 builder |
| 家政/现场服务 SaaS | Jobber, Housecall Pro, ServiceTitan | 报价、派工、调度、发票、支付 | 对小团队可能过重，迁移和配置成本高 | 做获客层、报价请求、线索跟进，不做全套 FSM |
| 专业行业 SaaS | Clio, Jane, SimplePractice | 法律/诊所专业工作流强 | 不专注获客网站、广告转化和品牌体验 | 做 marketing/intake layer，必要时集成而非替代 |
| 本地 web agency | Local agencies | 本地信任、服务感 | 交付慢、沟通多、项目费高 | 不做深定制，做低摩擦产品化网站 |
| 海外外包 | Fiverr, offshore devs | 低价 | 沟通、本地审美、合规、售后弱 | 强调北美本地理解、隐私意识和长期运营 |

### 4.2 我们的优势

- **Preview-first sales:** 客户先看到自己的网站样例，再决定是否购买。
- **Reputation-to-website:** 用客户真实口碑资产生成网站，不是空模板。
- **低沟通交付:** 不是从空白需求开始，而是从 AI preview 开始。
- **产品化模板:** 固定结构、固定套餐、固定修改范围，控制一人公司交付成本。
- **北美本地信任:** 加拿大时区、PIPEDA/CASL 意识、北美审美和本地服务语境。
- **高质量 preview:** 不追求模板数量，追求 preview 能让客户立即感知“这比我没有网站专业很多”。
- **轻业务闭环:** 即使 Starter 也有电话 CTA、表单、测试提交、托管监控，不只是页面生成。

### 4.3 我们的弱势

- **品牌信任弱:** 早期不如成熟 SaaS 和本地老牌 agency，需要用行业 Demo、SLA、备份和数据导出降低客户顾虑。
- **功能深度不足:** 不应承诺替代 Jobber、ServiceTitan、GoHighLevel 等成熟系统。
- **合规风险:** 医疗、法律、金融行业只做获客、预约、intake 和前台转化，不碰核心监管工作流。
- **交付失控风险:** 每个客户都深度定制会退化为低毛利外包，必须套餐化和模块化。

### 4.4 个性化竞争力

对外品牌表达应围绕：

> AI Website Studio for Local Businesses with Great Reviews and No Website.

推荐英文表达：

- We turn your great local reputation into a professional website.
- You already earned the reviews. We turn them into a website customers can trust.
- No blank-page website project. Start with a working preview.
- Built for local businesses that do great work but never had time to build a real website.

## 5. 产品线

### 5.1 Starter Reputation Site

第一产品不是复杂闭环系统，而是专业网站产品：

- 单页或轻量多区块网站
- 移动端优先
- 服务、电话、表单、区域、营业时间
- 评价主题和照片展示
- no-code client admin 暂不做，先由 Dandelion 托管维护
- 基础 SEO 与隐私实践

### 5.2 Growth Add-ons

当客户购买后，可追加：

- quote/request form
- email/SMS lead alert
- AI lead summary
- additional service pages
- monthly update service
- review/photo refresh workflow

### 5.3 Managed Reputation Service

月费服务是利润核心：

- 托管、监控、安全更新
- 表单测试和备份
- 小改动额度
- 客户授权后的照片/评价更新
- 简单月报
- 后续升级到行业 quote flow 和 lead inbox

## 6. 套餐与定价

定价仍需市场测试。原则不是成为最便宜的 AI builder，而是成为最省事、最可信、最容易上线的本地网站激活服务。

价格必须解释三组对比：

- 相比 $10-$30/month AI builder：Dandelion 帮客户完成上线和维护，不要求客户自己操作工具。
- 相比传统 agency：Dandelion 模板产品化、少沟通、AI 辅助，setup fee 明显更低。
- 相比没有网站/社交页：Dandelion 提供独立专业网站、表单、托管和基础信任资产。

官网价格页应允许后续 A/B 测试，不在代码中写死长期价格。

### 6.1 Starter Reputation Site

**价格:** CAD 299-499 一次性 + CAD 49-79/月
**适合:** 无网站但有好评的小型本地商家
**包含:**

- 1 个专业单页网站
- 移动端优化
- 电话 CTA 与联系表单
- 服务区块、照片、评价主题、营业时间、区域
- 托管、SSL、基础维护

### 6.2 Growth Reputation Site

**价格:** CAD 599-999 一次性 + CAD 99-149/月
**适合:** 需要更多页面、通知和更强询价的本地服务商
**包含:**

- Starter 全部内容
- 服务页或地区页
- quote/request flow
- email/SMS alert
- AI lead summary

### 6.3 Managed Reputation Site

**价格:** CAD 1,200-2,000 一次性 + CAD 199-299/月
**适合:** 需要长期内容更新和轻量增长支持的客户
**包含:**

- Growth 全部内容
- 每月小改动
- 授权素材更新
- 月度健康报告
- 季节性内容区块

## 7. 获客策略

### 7.1 第一阶段：Preview-first Outbound

不是先等客户主动询价，而是：

1. 合规发现无网站但好评的本地商家。
2. 生成 unofficial preview website。
3. 人工 QA。
4. 低量发送个性化邮件。
5. 客户喜欢后付款授权上线。

每个 preview 必须展示：

- 客户真实业务名称和服务方向；
- 清楚的 unofficial preview disclaimer；
- 真实口碑主题，而不是编造案例；
- 移动端体验；
- 电话和表单 CTA；
- 不被搜索引擎索引。

### 7.2 第二阶段：本地外呼和冷邮件

目标名单来源：

- Google Maps 本地行业搜索
- 商会、行业协会、社区 business directory
- Yelp、HomeStars、BBB、专业协会目录
- 已投广告但 landing page 弱的本地商家

核心话术：

> I noticed you have strong local reviews but no dedicated website. I made an unofficial preview showing how your reputation could look as a professional mobile-friendly website.

禁用话术：

- “我们可以定制任何系统。”
- “我们抓取了你的 Google 数据。”
- “这是你的官方网站。”
- “我们保证 SEO 排名和线索数量。”

推荐话术：

- “你已经有好评，我们把它变成专业网站。”
- “不用从空白开始，我已经做了一个 preview。”
- “喜欢就激活，不喜欢我会删除，不再打扰。”

### 7.3 第三阶段：合作渠道

优先建立这些合作：

- Google Ads freelancer
- 本地会计师、保险顾问、移民顾问
- 商会和行业协会
- 摄影、品牌设计、SEO 顾问
- IT support / MSP 公司

## 8. V2.0 交付 SOP

1. **Prospect:** 按行业和区域发现无网站但有口碑的商家。
2. **Qualify:** 检查网站状态、评价基础、照片、行业价值和合规风险。
3. **Generate Preview:** 用模板和 AI 生成 unofficial preview。
4. **QA:** 检查内容真实性、移动端、表单、noindex、disclaimer。
5. **Outreach:** 发送低量、人工审核、可退订的个性化邮件。
6. **Authorize:** 客户购买前签署服务协议和内容授权。
7. **Payment:** Stripe 收 setup fee 并创建订阅。
8. **Launch:** 绑定域名、切换 live form、移除 preview disclaimer、开启监控。
9. **Maintain:** 托管、备份、表单 smoke、小改动和授权素材更新。

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

### Week 1-2: 产品和合规底座

- 完成 AI Reputation Website Engine PRD。
- 完成 operating playbook、preview disclaimer、outreach template。
- 建立 Starter/Growth/Managed 三档报价。
- 明确 Google/CASL/PIPEDA 合规边界。
- 准备 service agreement、content authorization、payment terms 初稿。

### Week 3-4: Prospect-to-Preview MVP

- 开发 prospect 数据模型和手动/CSV 导入。
- 开发 website status classifier。
- 开发 Starter Reputation Site template renderer。
- 开发 AI site_config generator contract。
- 完成 preview build/smoke/noindex/disclaimer/test-form。

### Week 5-6: 首批获客

- 人工审核 20-50 个 Halifax / Atlantic Canada prospects。
- 生成 10 个 preview sites。
- 发送 5-10 封低量、人工审核、可退订 outreach。
- 记录打开、点击、回复、拒绝、异议。
- 不做大规模 spam，不自动群发。

### Week 7-8: 付款和上线闭环

- 接入 Stripe payment link 或 test-mode checkout。
- 完成 setup fee + monthly subscription 流程。
- 完成 preview -> active site launch checklist。
- 完成 live form、email notification、backup、uptime monitor。
- 尝试转化第一个付费客户。

### Week 9-10: 模板和行业聚焦

- 根据回复率选择第一个主攻行业。
- 将该行业 template、style、service sections、FAQ、gallery 规则标准化。
- 优化 prospect scoring。
- 记录客户最常见购买阻力。
- 如果某行业 20 个 prospect 无有效反馈，换行业。

### Week 11-12: 托管和复盘

- 建立 monthly maintenance checklist。
- 建立客户取消、导出、下线流程。
- 复盘每个 preview 的人工时间和质量问题。
- 决定是否进入 R1.0 首批付费客户阶段。

## 12. 当前最重要的判断

短期不要做通用 SaaS，不要抢已有强网站客户，不要做复杂运营系统，也不要做违法爬取或自动 spam。最优路径是：

> 用 AI preview-first 模式验证“有好评但无网站”的本地商家是否愿意为专业网站和托管月费付费；先拿到真实付费，再扩展行业模块和自动化能力。
