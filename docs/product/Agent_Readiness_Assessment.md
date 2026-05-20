# Agent 可开发性评估

**文档版本:** 1.0  
**编写日期:** 2026-05-17  
**评估对象:** 公司官网第一产品与 SMB 轻量运营闭环  
**结论:** 当前文档已足够启动产品规划和原型开发，但在进入并行工程开发前，需要补齐子系统边界、数据模型、API、事件流和角色验收标准。

---

## 1. 总体评估

各角色 Agent 可以使用现有文档开始工作，但可执行程度不同：

| Agent | 当前可执行性 | 可以立即做 | 仍需补齐 |
| --- | --- | --- | --- |
| Business Architect | 高 | 定位、客户画像、价值主张、行业包、销售话术 | 真实客户访谈数据、首批行业优先级验证 |
| Product Manager | 中高 | PRD、MVP scope、路线图、验收标准 | 子系统 backlog、版本切片、依赖关系 |
| Conversion UI Lead | 中 | 信息架构、首页结构、核心文案、Demo flow | 视觉方向、组件清单、页面线框、状态设计 |
| Operations Backend Lead | 中低 | 识别 Lead/Event/Admin/Notification 需求 | 数据模型、API contract、鉴权、存储策略 |
| DevOps SRE | 中 | Docker/Caddy/Cloudflare Tunnel demo 思路 | 环境变量规范、部署目标、监控/备份细节 |
| QA/Growth Analyst | 中 | KPI、基础 QA 方向、30 天优化方向 | 测试用例、事件校验、转化漏斗基线 |
| Market Intelligence Strategist | 高 | 竞争定位、差异化、市场复盘 | 实际 outreach 数据和竞争报价样本 |

## 2. 是否可以开始开发

可以开始，但应按垂直切片开发，不应先做完整平台。

推荐第一开发切片：

> Company Website MVP: Home + Audit Form + Lead API + Email Notification + Event Log + Basic Admin View

这个切片足以验证核心主张：网站不是展示页，而是业务线索进入、记录、通知和跟进的闭环。

## 3. Agent 输入完整性

### 3.1 Business Architect

已有输入：

- 目标客户：北美本地服务型 SMB。
- 核心定位：不是网站公司，不是通用 SaaS，而是产品化运营服务商。
- 竞争边界：避开成熟 SaaS 重功能，聚焦获客与轻运营。
- 初始行业：HVAC、诊所/牙医、律所/移民顾问。

缺口：

- 真实客户访谈。
- 本地行业冷启动名单。
- 每个行业的具体痛点语言。

结论：可以开始输出官网 offer 和行业 Demo narrative。

### 3.2 Product Manager

已有输入：

- Company Website PRD。
- Product Strategy。
- Business Plan。
- Delivery skill。

缺口：

- 子系统级 backlog。
- MVP vs V1 vs later 的明确边界。
- 每个子系统验收标准。

结论：可以开始拆 Epic，但需要使用 [Company_Website_Subsystems.md](Company_Website_Subsystems.md) 作为工程入口。

### 3.3 Conversion UI Lead

已有输入：

- 页面结构。
- 首页结构。
- Hero 和 differentiation copy。
- 目标 CTA。

缺口：

- 品牌视觉方向。
- 页面 wireframe。
- 表单状态、错误状态、success 状态。
- Admin view 信息层级。

结论：可以开始低保真页面和组件设计，但不能只做静态页面，必须连接 conversion flow。

### 3.4 Operations Backend Lead

已有输入：

- Lead Capture。
- Event Tracking。
- Admin View。
- Email Notification。

缺口：

- Entity schema。
- API endpoints。
- Auth strategy。
- Notification failure behavior。
- Event taxonomy。

结论：必须先读 [Company_Website_Subsystems.md](Company_Website_Subsystems.md) 的数据与 API 章节再开发。

### 3.5 DevOps SRE

已有输入：

- Docker demo。
- Caddy gateway。
- Cloudflare Tunnel。
- 未来 AWS/Vercel/Cloudflare Pages 方向。

缺口：

- MVP 环境变量。
- 本地/生产数据隔离。
- Admin 访问保护。
- 备份和恢复策略。

结论：可以支持本地 demo，但生产上线前需要补部署 runbook。

### 3.6 QA/Growth Analyst

已有输入：

- KPI。
- Launch checklist。
- 30-day optimization checklist。

缺口：

- 事件验收表。
- 表单和通知测试案例。
- 页面转化基线。

结论：可以定义测试计划，开发前应补齐 event acceptance criteria。

## 4. 启动开发所需最小文档集

Agent 开发前必须读取：

- [Company Website PRD](Company_Website_PRD.md)
- [Company Website Subsystems](Company_Website_Subsystems.md)
- [Product Strategy](Product_Strategy.md)
- [Architecture Proposal V4](../technical/Architecture_Proposal_V4.md)
- [AI Agents Workflow](../delivery/AI_Agents_Workflow.md)

需要真实客户交付时，还必须使用：

- `$customer-website-delivery`

## 5. 推荐并行开发切片

### Slice 1: Marketing Shell

Owner: Conversion UI Lead  
输出：首页、服务页、行业页、Demo 页、Pricing snapshot、CTA 组件。

### Slice 2: Lead Capture Loop

Owner: Operations Backend Lead + Conversion UI Lead  
输出：Audit form、Lead API、validation、success state、email notification。

### Slice 3: Event and Dashboard

Owner: Operations Backend Lead + QA/Growth Analyst  
输出：event taxonomy、event API、basic admin dashboard、conversion cards。

### Slice 4: Demo Narrative

Owner: Business Architect + Product Manager  
输出：可演示“访客 -> 表单 -> lead -> follow-up -> dashboard”的 narrative。

### Slice 5: Local Demo and Launch Readiness

Owner: DevOps SRE  
输出：Docker compose、gateway、env template、admin protection、launch checklist。

## 6. 当前建议

不要再扩大战略文档，下一步应该进入 Company Website MVP 的工程切片。若继续规划，应只补充能直接减少工程不确定性的内容：数据模型、API、事件、验收标准和部署 runbook。

