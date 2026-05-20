# Release 与迭代计划

**文档版本:** 1.7  
**首次编写日期:** 2026-05-17  
**最近更新日期:** 2026-05-19  
**当前总目标:** 将 Dandelion Growth Systems 官网实现为第一个可演示的 SMB 轻量运营闭环产品。

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
- 迭代之间尽量低依赖：前端营销、后端线索、事件、后台、部署可以独立推进，但最终通过 Demo 闭环整合。
- 未完成总目标时，继续规划下一轮迭代、开发、测试、记录结果。
- 不先做完整 SaaS；先实现可销售、可演示、可复用的官网 MVP。
- 有 P0/P1 review 问题时，不开启新功能迭代，先进入 stabilization milestone。

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
| R0.6 Dynamic Capability | M0.6 Dynamic Form System | I0.6.1 | Review Failed | select/email 校验已通过，但 checkbox 类型校验仍未闭环。 |

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
**状态:** Review Failed
**当前 Review:** `R0.6-CR-2026-05-19-003`
**范围:**
- form_configs 数据库表与 ORM 模型。
- 后端通用表单提交 API：当前标准 contract 为 `GET /api/forms/{form_key}` + `POST /api/forms/submit`。
- 动态字段校验逻辑：当前已覆盖 required presence、select/options、email，仍缺少 checkbox boolean 校验。
- 迁移 Audit Form 与 HVAC Quote 到配置驱动。

**验收:**
- 通过 API 插入一个 JSON 配置后，即可使用新接口接收对应数据。
- 提交的数据正确存入 leads.custom_fields。
- 自动触发对应的 form_submit 事件。

**当前阻断:**
- checkbox 类型后端校验未实现，非布尔值仍可写入 `leads.custom_fields`。
- 提交的 pass review 复用了 `R0.6-CR-2026-05-19-002`；下一份 follow-up/pass review 必须递增到 `R0.6-CR-2026-05-19-004`。
- forms 测试需补充 invalid checkbox 和 valid checkbox。
