# Release 与迭代计划

**文档版本:** 2.1
**首次编写日期:** 2026-05-17
**最近更新日期:** 2026-05-20
**当前总目标:** 将 Dandelion Growth Systems 官网实现为第一个专业、优美、易用、可转化的客户网站样板，并用轻量后台支撑线索跟进闭环。

---

## 1. 命名规范

本项目采用接近业界产品交付的四层命名：

- `Release`: 面向业务或客户可感知的一组能力，例如 `R0.5 Platform Stabilization`。
- `Milestone`: Release 内的一个阶段性目标，例如 `M0.5 Shared Module Integration Stabilization`。
- `Iteration`: Milestone 内可执行、可验证的短周期工作，例如 `I0.5.1 Runtime Config Fix`。
- `Code Review`: 每次 review 单独归档，例如 `R0.5-CR-2026-05-18-001`。

版本含义：

- `R0.x`: pre-revenue / MVP validation 阶段，还未进入正式客户规模化交付。
- `R1.x`: 第一个可收费客户交付阶段。
- `R2.x`: 可复制行业包与标准化运营闭环阶段。

Review 文档不再复用单个文件，统一放在 `docs/delivery/reviews/`。

## 2. 总体原则

- 每次迭代必须交付一个可运行、可验证的垂直切片。
- 迭代之间尽量低依赖：网站体验、表单、线索、通知、轻量后台、部署可以独立推进，但最终通过 Demo 闭环整合。
- 未完成总目标时，继续规划下一轮迭代、开发、测试、记录结果。
- 不先做完整 SaaS；先实现可销售、可演示、视觉专业、体验顺畅、可复用的客户网站 MVP。
- 有 P0/P1 review 问题时，不开启新功能迭代，先进入 stabilization milestone。
- 客户网站是核心产品，后台只是 owner 跟进线索的轻量工具。
- 每个 release 必须至少改善一个客户可见的网站体验维度：视觉、文案、移动端、CTA、表单、速度、信任或转化。
- 禁止在 R0.x 阶段扩张重型 CRM、复杂自动化、复杂报表和多角色权限。

## 3. 状态规范

Release、Milestone、Iteration 使用统一状态，不使用自由文本作为主状态。

- `Planned`: 已定义范围，尚未开始。
- `In Progress`: 正在开发或修复。
- `Blocked`: 因环境、权限或外部依赖无法完成。
- `Review Failed`: 代码 review 存在 P0/P1，不能进入下一阶段。
- `Ready for Review`: 开发完成，等待 review。
- `Completed`: 验收通过。
- `Completed with Known Blockers`: 核心目标完成，但存在明确外部阻塞。

Review 使用统一状态：

- `Failed`: 存在 P0/P1。
- `Conditional Pass`: 无 P0，但仍有必须关闭的 P1/P2。
- `Passed`: 无阻断问题，可进入下一 iteration。

## 4. Release Roadmap

| Release | Milestone | Iteration ID | 状态 | 目标 |
| --- | --- | --- | --- | --- |
| R0.1 Foundation MVP | M0.1 Company Website MVP Loop | I0.1.1 | Completed | 跑通官网、表单、lead、event、admin、dashboard 的最小闭环。 |
| R0.2 Demo Conversion | M0.2 Demo and Conversion Polish | I0.2.1 | Completed | 提升客户理解效率，补齐 demo、行业页、pricing、CTA 追踪。 |
| R0.3 Launch Readiness | M0.3 Local/Staging Launch Readiness | I0.3.1 | Completed with Known Blockers | 准备 staging/demo 发布，记录 Docker 环境阻塞。 |
| R0.4 Industry Pack | M0.4 First Industry Pack: HVAC | I0.4.1 | Completed | 用 HVAC 样板验证行业包复用。 |
| R0.5 Platform Stabilization | M0.5 Shared Module Integration Stabilization | I0.5.1-I0.5.3 | Completed | 修复 shared backend modules 接入后的架构、契约、数据库、测试问题。 |
| R0.6 Dynamic Form MVP | M0.6 Simple Form System | I0.6.1-I0.6.3 | In Progress | 完成配置化表单闭环，但保持访客表单体验简单、短、清楚。 |
| R0.7 Website Experience System | M0.7 Multipage Customer Website Quality | I0.7.1-I0.7.5 | Planned | 基于多页面高保真原型，将官网升级为专业客户网站样板，沉淀视觉、交互、行业页面和移动端 QA 标准。 |
| R0.8 Operator Simplicity | M0.8 Lead Inbox Lite | I0.8.1-I0.8.3 | Planned | 做最小 owner 跟进工具，不做复杂 CRM。 |
| R0.9 Launch Trust | M0.9 Production Launch | I0.9.1-I0.9.3 | Planned | 完成通知、安全、部署、备份和 staging smoke，让样板网站可上线。 |

## 4.1 Completion Standards

### Standard A: 官网可上线 MVP

目标：Dandelion 官网可以公开上线、用于销售演示和冷启动获客，并达到未来客户网站的最低体验标准。

必须满足：

- Marketing pages 完整：Home、Services、Industries、HVAC、Demo、Pricing、Privacy。
- 首页和核心页面视觉专业、移动端顺畅、CTA 明确。
- 至少 Audit Form 和 HVAC Quote Form 能提交真实 lead。
- 所有表单走统一配置化渲染路径，不再依赖每个页面硬编码字段。
- 后端保存 lead、event，并支持 Lead Inbox / Conversion Snapshot 查看。
- Admin 接口受保护。
- Frontend build、backend tests、真实 client app smoke 均通过。
- 有 launch runbook 和 `.env.example`。

对应完成点：R0.7 完成并 review passed。

### Standard B: 第一个标准化客户产品

目标：官网不只是营销页，而是可以作为客户网站项目的标准交付样板。

必须满足：

- 具备可复用的客户网站体验标准、页面模式和视觉 QA。
- 配置化表单系统完成前后端闭环。
- Lead Inbox Lite 能支持线索列表、详情、状态、备注、事件时间线、基础筛选。
- Notification System 至少支持 mock + SMTP/provider adapter，并记录发送结果。
- Booking CTA/event tracking 可复用。
- 支持基础 CSV export，便于小企业离开复杂 SaaS 也能拿到数据。
- Docker/backend/frontend 部署路径可复现。
- 上线前具备 rate limit、生产配置检查、备份/恢复 runbook 和 staging smoke。

对应完成点：R0.9 完成并 review passed。

## R0.1 Foundation MVP

### M0.1 Company Website MVP Loop

**Iteration ID:** I0.1.1
**目标:** 跑通访客访问、提交 audit request、后端创建 lead、记录 event、内部 admin 查看和更新状态、dashboard 显示基础数据。
**状态:** Completed
**完成说明:** Frontend build passed. Backend API loop passed. Docker verification was blocked because Docker was not installed in the current environment.

**范围:**

- Marketing site shell
- Audit form
- Lead API
- Event API
- Mock notification log
- Admin lead list/detail
- Basic dashboard
- Local Docker/dev run

**验收:**

- 首页和核心页面可访问。
- Audit form 可提交。
- 后端保存 lead 和 event。
- Admin 可以查看 lead。
- Dashboard 可以显示 lead/status/event 汇总。
- 本地 build 或静态检查通过。

## R0.2 Demo Conversion

### M0.2 Demo and Conversion Polish

**Iteration ID:** I0.2.1
**目标:** 让客户无需讲解也能理解“网站 + 业务闭环”。
**状态:** Completed
**完成说明:** Added Services, Industries, HVAC, Pricing, Privacy, Demo route coverage. Frontend build passed and routes returned 200 after dev server restart.

**范围:**

- Demo narrative page
- HVAC Lead Engine preview
- Pricing snapshot
- Business loop visualization
- CTA/event coverage
- Mobile polish

**验收:**

- Demo 页面展示 visitor view 和 owner view。
- 关键 CTA 全部有事件。
- 移动端布局可用。

## R0.3 Launch Readiness

### M0.3 Local/Staging Launch Readiness

**Iteration ID:** I0.3.1
**目标:** 达到可通过 Cloudflare Tunnel 或 staging URL 演示的稳定状态。
**状态:** Completed with Known Blockers
**完成说明:** Added env example, launch runbook, admin API key protection, route checks, and verification notes. Docker verification remains blocked because Docker is unavailable in the current environment.

**范围:**

- Env template
- Admin protection baseline
- Docker compose verification
- Privacy notice
- Accessibility smoke test
- Launch checklist update

**验收:**

- Docker 启动成功。
- 表单、通知、admin、dashboard 在容器内可用。
- 有明确生产迁移事项。

## R0.4 Industry Pack

### M0.4 First Industry Pack: HVAC

**Iteration ID:** I0.4.1
**目标:** 基于官网底座制作 HVAC Lead Engine Demo。
**状态:** Completed
**完成说明:** HVAC page includes an industry-specific quote request form that reuses the same Lead/Event/Admin loop. Frontend build and backend equivalent lead-loop smoke test passed.

**范围:**

- HVAC landing page
- Quote request variant
- HVAC-specific fields
- Follow-up reminder mock
- Industry dashboard cards

**验收:**

- HVAC Demo 可作为销售样板。
- 至少 60% 代码/组件复用官网底座。

## R0.5 Platform Stabilization

### M0.5 Shared Module Integration Stabilization

**目标:** 将架构师实现的 shared backend modules 稳定接入 Dandelion 官网，恢复并强化“网站 + 后台运营闭环”的可构建、可测试、可部署状态。
**状态:** Completed
**状态说明:** R0.5 P0/P1 已关闭。当前通过 review 为 `docs/delivery/reviews/R0.5-CR-2026-05-19-docker-context-fix.md`。Docker 已安装，backend image build 已通过；容器运行时 MySQL 网络配置仍需在 staging 前验证。
**当前 Review:** `R0.5-CR-2026-05-19-003`

**范围:**

- 客户后端稳定读取 `.env` 并默认连接 MySQL。
- Admin/Dashboard API 与前端 Admin 页面契约对齐。
- 后台接口加入 `ADMIN_API_KEY` 鉴权。
- migration、ORM、实际 MySQL 表结构一致。
- 补齐核心索引、FK 和后台闭环基础表。
- 扩展测试覆盖 MySQL、admin contract、鉴权和 frontend build。

**验收:**

- `clients/dandelion/frontend` 执行 `npm run build` 通过。
- `packages/backend` 执行 `.venv/bin/python -m pytest -q` 通过。
- 默认客户后端配置输出 MySQL `DATABASE_URL`。
- Admin dashboard、lead queue、status update 可用。
- 无 admin key 不能访问后台数据。
- `SHOW INDEX` 能看到设计要求的核心查询索引。

### I0.5.1 Runtime Config and Dependency Fix

**状态:** Completed
**目标:** 先修复客户后端默认连接错误数据库、依赖不可复现和启动方式不稳定的问题。

**验收:**

- 默认 `ClientConfig.from_env()` 使用客户 `.env`。
- 默认连接 `dandelion_website_db`，不写入 SQLite。
- backend 依赖文件完整。

### I0.5.2 Admin API Contract Recovery

**状态:** Completed
**目标:** 恢复 Admin 页面依赖的 dashboard、lead queue、status update API。

**验收:**

- `getDashboard/getLeads/updateLeadStatus` 在前端存在且契约匹配。
- `/api/admin/dashboard`、`/api/admin/leads`、`PATCH /api/admin/leads/{lead_id}/status` 可用。
- `npm run build` 通过。

### I0.5.3 Security and Migration Baseline

**状态:** Completed
**目标:** 把后台数据接口和数据库 schema 拉回可交付基线。

**验收:**

- 后台接口必须通过 `X-Admin-Key`。
- migration 初始化 MySQL schema。
- FK、index、后台闭环基础表与 ORM 一致。

## 5. 当前 Review Ledger

| Review ID | 文件 | Release | Milestone | 状态 | 决策 |
| --- | --- | --- | --- | --- | --- |
| R0.5-CR-2026-05-18-001 | `docs/delivery/reviews/R0.5-CR-2026-05-18-shared-module-integration.md` | R0.5 | M0.5 | Failed | 不允许进入下一 iteration，必须先修复 P0/P1。 |
| R0.5-CR-2026-05-19-001 | `docs/delivery/reviews/R0.5-CR-2026-05-19-admin-contract-followup.md` | R0.5 | M0.5 | Failed | 已有进展，但不允许进入下一 iteration，必须先修复客户默认后台不可用、公开 lead list、部署依赖和 migration safety。 |
| R0.5-CR-2026-05-19-002 | `docs/delivery/reviews/R0.5-CR-2026-05-19-final-stabilization-pass.md` | R0.5 | M0.5 | Failed | P0 已关闭，但不允许进入 M0.6，必须先修复 backend Docker/compose 独立部署路径缺少 shared package。 |
| R0.5-CR-2026-05-19-003 | `docs/delivery/reviews/R0.5-CR-2026-05-19-docker-context-fix.md` | R0.5 | M0.5 | Passed | R0.5 P0/P1 已关闭；允许进入 M0.6。Docker backend image build 已通过；容器运行时 MySQL 网络配置仍需在 staging 前验证。 |
| R0.6-CR-2026-05-19-001 | `docs/delivery/reviews/R0.6-CR-2026-05-19-backend-form-engine.md` | R0.6 | M0.6 | Failed | 不允许进入前端 FormRenderer；必须先修复默认 MySQL 配置、migration 幂等性、schema required 校验、forms 测试和 schema 读取 API。 |
| R0.6-CR-2026-05-19-002 | `docs/delivery/reviews/R0.6-CR-2026-05-19-dynamic-engine-fix.md` | R0.6 | M0.6 | Failed | 不允许进入前端 FormRenderer；必须先修复 select/options 后端校验，并统一 endpoint contract、文档、脚本和测试。 |
| R0.6-CR-2026-05-19-003 | `docs/delivery/reviews/R0.6-CR-2026-05-19-deep-validation-followup.md` | R0.6 | M0.6 | Failed | select/email 校验、测试和构建已通过；必须先补齐 checkbox boolean 校验。 |
| R0.6-CR-2026-05-19-004 | `docs/delivery/reviews/R0.6-CR-2026-05-19-checkbox-validation-pass.md` | R0.6 | M0.6 | Passed | I0.6.1 后端动态表单引擎通过；允许进入 I0.6.2 Frontend FormRenderer。 |

## 6. Review 文档演进规则

每次架构师提交后，Reviewer 必须创建新的 review 文档，不覆盖旧文档。

命名：

```text
docs/delivery/reviews/R<release>-CR-<YYYY-MM-DD>-<scope>.md
```

文档必须包含：

- Review ID
- 所属 Release/Milestone
- 验证命令与结果
- P0/P1/P2 findings
- 修复要求
- 验收标准
- 是否允许进入下一 iteration

当 review 通过后，才允许新增下一 release 或 milestone。

## R0.6 Dynamic Capability

### M0.6 Dynamic Form System

**Iteration ID:** I0.6.1
**目标:** 实现后端通用表单提交引擎，支持通过 JSON 配置定义字段，无需修改代码即可支持新行业。
**状态:** Completed
**当前 Review:** `R0.6-CR-2026-05-19-004`
**范围:**
- form_configs 数据库表与 ORM 模型。
- 后端通用表单提交 API：当前标准 contract 为 `GET /api/forms/{form_key}` + `POST /api/forms/submit`。
- 动态字段校验逻辑：覆盖 required presence、select/options、email、checkbox boolean。
- 迁移 Audit Form 与 HVAC Quote 到配置驱动。

**验收:**
- 通过 API 插入一个 JSON 配置后，即可使用新接口接收对应数据。
- 提交的数据正确存入 leads.custom_fields。
- 自动触发对应的 form_submit 事件。
- `.venv/bin/python -m pytest -q` 通过，结果 `7 passed`。
- `npm run build` 通过。
- 真实 client app smoke 验证 MySQL、schema discovery、valid checkbox、invalid checkbox/select/email。

**完成说明:** R0.6.1 后端引擎已通过最终 review，可作为前端配置化渲染器的 API 基线。

### I0.6.2 Frontend FormRenderer

**Iteration ID:** I0.6.2
**目标:** 前端不再为每个行业硬编码表单字段，而是根据 `GET /api/forms/{form_key}` 返回的 schema 动态渲染表单并提交到 `POST /api/forms/submit`。
**状态:** Planned
**前置条件:** I0.6.1 Passed。

**范围:**
- 新增可复用 `FormRenderer` 组件。
- 支持字段类型：text、email、phone、textarea、select、checkbox、date。
- 支持 required、placeholder、options、submit_label、success_message。
- 将 backend `422 detail.errors` 显示为用户可理解的字段/表单错误。
- 将 Audit Form 和 HVAC Quote Form 迁移到 schema-driven 渲染路径，保留现有页面视觉风格。

**验收:**
- 使用 `form_key` 拉取 schema 后可以渲染完整表单。
- 合法提交写入 lead/event。
- invalid select/email/checkbox 能显示后端返回错误。
- `npm run build` 通过。
- 至少一个真实页面使用 `FormRenderer` 替代硬编码字段。

### I0.6.3 Schema Seed and Website Migration

**Iteration ID:** I0.6.3
**目标:** 把 Dandelion 官网自身作为第一个配置化表单客户，完成 Audit Form 与 HVAC Quote Form 的 schema seed、页面迁移和回归验证。
**状态:** Planned
**前置条件:** I0.6.2 完成。

**范围:**
- 新增或完善 form config seed 脚本，写入 `audit_request` 与 `hvac_quote`。
- Audit Form 页面改为读取 `audit_request` schema。
- HVAC 页面改为读取 `hvac_quote` schema。
- 保留现有页面视觉和 CTA 叙事，不因动态渲染降低转化体验。
- 更新前端 API client，标准化 `getFormConfig` 与 `submitForm`。

**验收:**
- 新库初始化后可 seed 两个表单配置。
- Audit Form 和 HVAC Quote Form 都通过动态 schema 渲染。
- 两个表单合法提交均写入 lead/event。
- 后端 invalid select/email/checkbox 错误能在前端显示。
- `npm run build` 和 backend pytest 均通过。

## R0.7 Website Experience System

### M0.7 Customer Website Quality

**目标:** 把 Dandelion 官网从“功能可演示”升级为“客户愿意购买的专业多页面网站样板”，并沉淀可复用的网站体验标准。
**状态:** Planned
**设计基线:** `docs/product/prototypes/dandelion-multipage/index.html` 及同目录多页面原型。
**建议开发方式:** 可以让架构师和设计/前端 agent 一次性开发 I0.7.1-I0.7.5，但 review 必须按视觉系统、真实页面结构、行业样板、Demo/Pricing、移动端/表单体验五个 slice 验收。
**设计原则:** 不和大型 SaaS 拼功能，优先做到像优秀 Google Docs 一样简单、清楚、顺畅。

**页面映射:**

| 原型文件 | 目标代码页面 | 页面职责 |
| --- | --- | --- |
| `prototypes/dandelion-multipage/index.html` | `clients/dandelion/frontend/app/page.tsx` | Home：定位、信任、核心闭环、行业入口 |
| `prototypes/dandelion-multipage/services.html` | `clients/dandelion/frontend/app/services/page.tsx` | Services：服务内容和 Own/Integrate/Avoid 边界 |
| `prototypes/dandelion-multipage/industries.html` | `clients/dandelion/frontend/app/industries/page.tsx` | Industries：行业入口和行业化复用逻辑 |
| `prototypes/dandelion-multipage/hvac.html` | `clients/dandelion/frontend/app/industries/hvac/page.tsx` | HVAC：第一个可销售行业网站样板 |
| `prototypes/dandelion-multipage/demo.html` | `clients/dandelion/frontend/app/demo/page.tsx` | Demo：visitor view 到 owner follow-up 的闭环 |
| `prototypes/dandelion-multipage/pricing.html` | `clients/dandelion/frontend/app/pricing/page.tsx` | Pricing：简化套餐选择，引导 audit |
| `prototypes/dandelion-multipage/audit.html` | `clients/dandelion/frontend/app/page.tsx#audit` 或独立 audit route | Audit：独立转化流程或首页 audit section |

**关键约束:**

- 首页不能再堆叠所有子页面内容，只保留定位、信任、核心闭环、行业入口和 audit CTA。
- HVAC 必须作为独立行业样板页，而不是首页一个普通区块。
- Demo 必须独立说明 `real today / configurable / optional later`，避免销售误导。
- Pricing 必须像服务套餐，不像 SaaS 功能矩阵。
- Lead Inbox 只作为轻量 owner view 预览，不开发 R0.8 后台能力。

### I0.7.1 Visual System and Brand Direction

**Iteration ID:** I0.7.1
**目标:** 将多页面高保真原型中的 `Warm Operator Studio` 视觉系统落地到前端代码，让官网具备专业客户网站的基础视觉质量。
**状态:** Planned

**范围:**
- 从 `prototypes/dandelion-multipage/styles.css` 提取可维护的 design tokens 到 `globals.css` / Tailwind 配置。
- 定义品牌设计方向：Ink、Cream、Wheat、Moss、Ember、Porcelain、soft shadow、large radius、editorial typography。
- 建立共享组件：site header、button variants、section header、cards、proof strip、split panel、mobile sticky CTA。
- 重构全站导航，使公开页面使用一致 header 和 primary audit CTA。
- 保留现有业务叙事，但提升视觉层次、信任感和 CTA 强度，避免 generic SaaS 风格。
- 更新设计验收截图或视觉 QA 记录。

**验收:**
- 首页首屏 5 秒内表达专业、可信、面向 SMB。
- Desktop 和 mobile 均有明确视觉层次。
- CTA 样式一致，primary/secondary action 清楚。
- 公开页面共享同一视觉系统，不出现页面间割裂。
- 不引入新的 UI framework。
- `npm run build` 通过。
- Review 必须包含桌面与手机端截图或浏览器验证记录。

### I0.7.2 Multipage Information Architecture Implementation

**Iteration ID:** I0.7.2
**目标:** 按多页面原型实现真实官网信息架构，避免把所有内容堆在首页。
**状态:** Planned

**范围:**
- Home：只承担定位、信任、核心闭环、行业入口和 audit CTA。
- Services：解释 Professional Website、Quote Request Flow、Booking Path、Lead Inbox Lite、Conversion Snapshot、Managed Updates。
- Industries：展示 HVAC、Dental、Immigration 三个行业入口和行业化复用逻辑。
- 页面间导航、CTA、文案风格与多页面原型一致。
- 删除或压缩低价值功能堆砌内容，保留每页清晰叙事：problem、offer、proof、process、CTA。
- 复用共享组件，不在页面内复制大量样式。

**验收:**
- 访问者 30 秒内能理解服务对象、核心价值和下一步动作。
- 每个核心页面都有 above-fold CTA 和 bottom CTA。
- 页面不以后台功能为主角，主角是客户网站和业务结果。
- Home 不包含完整 HVAC、完整 Demo、完整 Pricing、完整 Audit 页内容，只保留入口和预览。
- `services`、`industries`、`pricing`、`demo` 路由均可直接访问。
- `npm run build` 通过。

### I0.7.3 Industry Website Template: HVAC

**Iteration ID:** I0.7.3
**目标:** 按 `hvac.html` 高保真原型，将 HVAC 页面升级为第一个可销售的行业网站样板，而不是单纯功能 demo。
**状态:** Planned

**范围:**
- HVAC 首页式 landing page：service search、emergency、repair、installation、maintenance、quote 场景清楚。
- HVAC 服务区块：repair、installation、maintenance、emergency。
- 行业 trust elements：licensed/insured、service area、response promise、review/social proof placeholder。
- Quote form CTA 与页面文案强绑定。
- HVAC quote form 使用 `FormRenderer` / schema-driven path，不回退硬编码提交路径。
- 移动端突出 call/quote action。

**验收:**
- HVAC 页面可单独发给潜在客户作为行业样板。
- 页面视觉和文案明显区别于 Dandelion 官网，但复用同一设计系统。
- Quote form 保持简单，字段只服务报价跟进。
- 合法提交写入 lead/event。
- 手机端能在 30 秒内完成 quote CTA 到表单理解。

### I0.7.4 Demo and Pricing Conversion Pages

**Iteration ID:** I0.7.4
**目标:** 按 `demo.html` 和 `pricing.html` 原型，把 Demo 与 Pricing 变成可销售、可信、不误导的独立页面。
**状态:** Planned

**范围:**
- Demo 页面展示 visitor view、owner view、lead loop，并明确 `real today / configurable / optional later`。
- Demo 页面不夸大未实现能力，不把 roadmap 写成已上线。
- Pricing 页面采用服务套餐表达：Launch、Growth、Managed Ops。
- Pricing 页面避免 SaaS feature matrix，突出 audit 作为下一步。
- 每页都有 primary audit CTA 和清楚的 bottom CTA。

**验收:**
- Demo 页面无需销售讲解即可理解“网站 -> 表单/预约 -> 通知 -> Lead Inbox”的闭环。
- Demo 页面明确标记真实能力、可配置能力和后续可选能力。
- Pricing 页面能降低购买不确定性，而不是增加复杂比较。
- `npm run build` 通过。

### I0.7.5 Mobile, Audit Form, and Website QA

**Iteration ID:** I0.7.5
**目标:** 按 `audit.html` 原型和 Website QA Checklist，把移动端、audit form、HVAC quote form、成功状态和错误状态提升到可上线质量。
**状态:** Planned

**范围:**
- Mobile navigation、hero、CTA band、form layout QA。
- Audit flow 可以保留首页 section 或拆成独立 route，但必须具备独立转化流程体验。
- FormRenderer UI polish：loading、field error、form error、success state。
- 成功状态必须说明下一步和预计响应方式。
- 表单字段顺序、label、placeholder、help text 按行业优化。
- 建立 Website QA Checklist 执行记录。

**验收:**
- 手机端完成一次 audit form 和 HVAC quote form 提交无阻塞。
- 后端 422 错误能转成用户可理解的提示。
- 表单成功状态不只是 `success`，必须有下一步说明。
- Review 引用 [Customer Website Experience Standard](../product/Customer_Website_Experience_Standard.md) 的 checklist。
- Review 引用 [Dandelion Multipage Prototype](../product/prototypes/dandelion-multipage/index.html) 并说明与原型的 intentional differences。

## R0.8 Operator Simplicity

### M0.8 Lead Inbox Lite

**目标:** 让 SMB owner 能用最少操作跟进线索，后台保持像 inbox 一样简单，不做复杂 CRM。
**状态:** Planned
**建议开发方式:** 可以一次性开发 I0.8.1-I0.8.3，但 review 必须检查“是否降低 owner 操作负担”，不能只检查 API 完整性。

### I0.8.1 Lead Detail and Timeline Lite

**Iteration ID:** I0.8.1
**目标:** Owner 能从 lead list 进入 lead detail，并看到联系信息、需求、来源和关键事件。
**状态:** Planned

**范围:**
- 后端新增或补齐 lead detail API。
- 后端提供按 `lead_id` 查询 events 的 timeline API。
- 前端 Admin 页面支持 lead list -> detail。
- detail 显示 contact、business、source、custom_fields、status、last_activity。
- timeline 只展示 owner 需要理解的事件，不展示技术噪音。

**验收:**
- 无 admin key 不能访问。
- 有 admin key 可查看 lead detail。
- lead 相关 events 按时间倒序显示。
- 页面能回答“我下一步该联系谁、为什么联系”。
- `npm run build` 和 backend pytest 通过。

### I0.8.2 Notes, Status, Filters

**Iteration ID:** I0.8.2
**目标:** Owner 能完成最小跟进动作：标记状态、写备注、找到未处理线索。
**状态:** Planned

**范围:**
- Lead notes API：create/list。
- Lead list 支持 status、industry、source 筛选。
- Lead list 支持简单分页。
- Admin 页面支持添加 note 和更新状态后刷新 timeline。
- Dashboard summary 与筛选口径一致。

**验收:**
- 可以为 lead 添加 note。
- status 更新写入 event。
- note 写入后可在 detail 中显示。
- 筛选和分页不会暴露未授权数据。
- 后台 UI 不引入复杂 pipeline、复杂权限或复杂配置。
- backend pytest 覆盖 notes/status/filter。

### I0.8.3 CSV Export and Owner Workflow Polish

**Iteration ID:** I0.8.3
**目标:** Owner 可以导出线索，并在后台看到简单的跟进提示。
**状态:** Planned

**范围:**
- Admin CSV export API。
- Export 字段限制，避免导出不必要 event metadata。
- Lead Inbox 增加 empty/loading/error states。
- 增加简单 workflow hints：new lead、contacted、proposal sent、won/lost。
- 更新 admin 使用说明，语言面向普通 owner。

**验收:**
- CSV export 需要 admin key。
- CSV 包含 lead 基础字段、status、source、created_at、last_activity。
- UI 在无数据、错误、加载时可用。
- Owner 不需要学习 CRM 概念即可完成日常跟进。
- `npm run build` 和 backend pytest 通过。

## R0.9 Launch Trust

### M0.9 Production Launch

**目标:** 将官网从本地可演示推进到可上线、可恢复、可监控的生产样板网站。
**状态:** Planned
**建议开发方式:** I0.9.1-I0.9.3 可以同一批开发，但 review 必须按 notification、security、deployment 三类验收。

### I0.9.1 Notification Adapter and Audit Trail

**Iteration ID:** I0.9.1
**目标:** 新 lead 创建后能可靠触发内部通知，并记录成功/失败。
**状态:** Planned

**范围:**
- Notification adapter interface。
- Local mock adapter。
- SMTP 或 provider adapter 配置入口。
- Notification logs 与 events 对齐。
- 失败不阻塞 lead 保存。

**验收:**
- 本地 mock 模式可验证 notification_sent。
- provider 配置缺失时不导致 500。
- notification failure 记录为可诊断日志/event。
- backend pytest 覆盖 success/failure。

### I0.9.2 Security, Rate Limit, Production Config Check

**Iteration ID:** I0.9.2
**目标:** 降低公开表单、后台和生产配置的基础风险。
**状态:** Planned

**范围:**
- Public form submission rate limit。
- Admin key 强度检查或生产配置检查。
- CORS / allowed origin 配置。
- 禁止生产默认 secret。
- 明确 error response 不泄露内部信息。

**验收:**
- 缺失生产必需 env 时启动失败或输出明确错误。
- 默认 development secret 不能用于 production。
- rate limit 命中时返回明确状态。
- 后台接口仍全部要求 admin key。

### I0.9.3 Deployment Runbook and Staging Smoke

**Iteration ID:** I0.9.3
**目标:** 让官网可以按文档稳定部署、验证和回滚。
**状态:** Planned

**范围:**
- 更新 Docker Compose / deployment runbook。
- MySQL migration runbook。
- Backup/restore runbook。
- Staging smoke checklist。
- Release merge checklist。

**验收:**
- 新环境按 runbook 可初始化数据库和表。
- backend/frontend 容器 build 通过。
- staging smoke 覆盖 homepage、mobile CTA、form submit、Lead Inbox、lead status update。
- 文档说明如何从 release branch 合并回 `main`。
