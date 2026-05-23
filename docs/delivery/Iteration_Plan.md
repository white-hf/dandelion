# Release 与迭代计划索引

**文档版本:** 4.0
**首次编写日期:** 2026-05-17
**最近更新日期:** 2026-05-23
**当前总目标:** 将 Dandelion 从公司官网 Demo 演进为 AI Reputation Website Engine：合规发现无网站但有真实口碑的本地商家，自动生成 preview website，客户付款授权后正式上线并托管维护。

---

## 1. 命名规范

本项目采用接近业界产品交付的四层命名：

- `Release`: 面向业务或客户可感知的一组能力，例如 `R0.8 AI Reputation Website Engine MVP`。
- `Milestone`: Release 内的一个阶段性目标，例如 `M0.8 Product Site and Prospect-to-Preview Loop`。
- `Iteration`: Milestone 内可执行、可验证的短周期工作，例如 `I0.8.1 Prospect Data Model and Manual Import`。
- `Code Review`: 每次 review 单独归档，例如 `R0.8-CR-2026-05-23-001`。

版本含义：

- `R0.x`: pre-revenue / MVP validation 阶段，还未进入正式客户规模化交付。
- `R1.x`: 第一个可收费客户交付阶段。
- `R2.x`: 可复制行业包与标准化运营闭环阶段。

Review 文档统一放在 `docs/delivery/reviews/`。

## 2. 总体原则

- 每次迭代必须交付一个可运行、可验证的垂直切片。
- 迭代之间尽量低依赖；但必须通过完整 preview-to-customer 业务闭环整合。
- 未完成总目标时，继续规划下一轮迭代、开发、测试、记录结果。
- 不先做完整 SaaS；先实现可销售、可演示、视觉专业、体验顺畅、可复用的 AI 网站激活 MVP。
- 有 P0/P1 review 问题时，不开启新功能迭代，先进入 stabilization milestone。
- 客户网站是核心产品，后台只是 operator 与 owner 的轻量工具。
- 每个 release 必须至少改善一个客户可见的网站体验或运营闭环维度：视觉、文案、移动端、CTA、表单、速度、信任、转化、授权、付款或上线。
- 禁止在 R0.x 阶段扩张重型 CRM、复杂自动化、复杂报表、多角色权限、自助 builder 和自动群发。

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

| Release | Milestone | Iteration ID | 状态 | 文档 | 目标 |
| --- | --- | --- | --- | --- | --- |
| R0.1 Foundation MVP | M0.1 Company Website MVP Loop | I0.1.1 | Completed | [R0.1-R0.5](iterations/R0.1-R0.5-foundation-stabilization.md) | 跑通官网、表单、lead、event、admin、dashboard 的最小闭环。 |
| R0.2 Demo Conversion | M0.2 Demo and Conversion Polish | I0.2.1 | Completed | [R0.1-R0.5](iterations/R0.1-R0.5-foundation-stabilization.md) | 提升客户理解效率，补齐 demo、行业页、pricing、CTA 追踪。 |
| R0.3 Launch Readiness | M0.3 Local/Staging Launch Readiness | I0.3.1 | Completed with Known Blockers | [R0.1-R0.5](iterations/R0.1-R0.5-foundation-stabilization.md) | 准备 staging/demo 发布，记录 Docker 环境阻塞。 |
| R0.4 Industry Pack | M0.4 First Industry Pack: HVAC | I0.4.1 | Completed | [R0.1-R0.5](iterations/R0.1-R0.5-foundation-stabilization.md) | 用 HVAC 样板验证行业包复用。 |
| R0.5 Platform Stabilization | M0.5 Shared Module Integration Stabilization | I0.5.1-I0.5.3 | Completed | [R0.1-R0.5](iterations/R0.1-R0.5-foundation-stabilization.md) | 修复 shared backend modules 接入后的架构、契约、数据库、测试问题。 |
| R0.6 Dynamic Form MVP | M0.6 Simple Form System | I0.6.1-I0.6.3 | Completed | [R0.6](iterations/R0.6-dynamic-form-mvp.md) | 完成配置化表单闭环，但保持访客表单体验简单、短、清楚。 |
| R0.7 Website Experience System | M0.7 Multipage Customer Website Quality | I0.7.1-I0.7.5 | Completed | [R0.7](iterations/R0.7-website-experience-system.md) | 基于多页面高保真原型，将官网升级为专业客户网站样板，沉淀视觉、交互、行业页面和移动端 QA 标准。 |
| R0.8 AI Reputation Website Engine MVP | M0.8 Product Site and Prospect-to-Preview Loop | I0.8.0-I0.8.5 | Planned | [R0.8](iterations/R0.8-ai-reputation-website-engine-mvp.md) | 官网改为 AI 网站激活产品站，并完成 prospect 导入、网站状态识别、AI preview config、预览站生成、合规 outreach 草稿。 |
| R0.9 Customer Activation and Managed Launch | M0.9 Preview-to-Paid-Customer Loop | I0.9.1-I0.9.5 | Planned | [R0.9](iterations/R0.9-customer-activation-managed-launch.md) | 完成合同授权、付款订阅、正式上线、托管监控和首批客户运营闭环。 |

## 5. Completion Standards

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

目标：Dandelion 可以把一个无网站但有真实口碑的 prospect 转化为可体验 preview site，并具备购买上线的运营闭环。

必须满足：

- 公司官网已调整为 AI Reputation Website Engine 产品站。
- Prospect 数据模型、手动/半自动导入和 website status classifier 可用。
- Starter Reputation Site 模板可根据 config 生成 noindex preview。
- Preview site 有 unofficial disclaimer、test-mode form、自动 build/smoke。
- AI content generator 输出结构化 config，并记录内容来源和授权状态。
- Outreach draft 可生成，但必须人工审核发送。
- Operating playbook 覆盖 prospect、preview、outreach、合同、付款、上线和运维。
- 正式上线前具备 service agreement、content authorization、payment、launch checklist。
- 至少完成 5 个真实 prospect preview 的内部验证。

对应完成点：R0.9 完成并 review passed。

## 6. Iteration Documents

按 Release 递增维护，不再把所有迭代写入一个大文件。

- [R0.1-R0.5 Foundation and Stabilization](iterations/R0.1-R0.5-foundation-stabilization.md)
- [R0.6 Dynamic Form MVP](iterations/R0.6-dynamic-form-mvp.md)
- [R0.7 Website Experience System](iterations/R0.7-website-experience-system.md)
- [R0.8 AI Reputation Website Engine MVP](iterations/R0.8-ai-reputation-website-engine-mvp.md)
- [R0.9 Customer Activation and Managed Launch](iterations/R0.9-customer-activation-managed-launch.md)
- [Review Ledger and Rules](iterations/Review_Ledger_and_Rules.md)

## 7. Maintenance Rule

新增或修改迭代时：

- 只更新对应 release 文档。
- 如果 roadmap 状态变化，同时更新本索引的 Release Roadmap。
- Review 仍然单独写入 `docs/delivery/reviews/`，并同步更新 [Review Ledger and Rules](iterations/Review_Ledger_and_Rules.md)。
- Summary 仍然写入 `docs/delivery/summaries/`。
