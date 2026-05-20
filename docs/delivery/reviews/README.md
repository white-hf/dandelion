# Code Review Registry

本目录存放不可变的阶段性代码 review 文档。每次 review 使用独立文件，不覆盖历史记录。

## 命名规范

```text
R<release>-CR-<YYYY-MM-DD>-<scope>.md
```

示例：

- `R0.5-CR-2026-05-18-shared-module-integration.md`
- `R0.5-CR-2026-05-19-admin-contract-followup.md`
- `R0.6-CR-2026-05-22-notification-workflow.md`

## Review ID 规范

```text
R<release>-CR-<YYYY-MM-DD>-<sequence>
```

示例：

- `R0.5-CR-2026-05-18-001`
- `R0.5-CR-2026-05-19-002`

## 状态规范

- `Failed`: 存在 P0/P1，不能进入下一迭代。
- `Conditional Pass`: 无 P0，但有必须在同一 release 内关闭的 P1/P2。
- `Passed`: 无阻断问题，可以输出下一迭代计划。

## 当前 Review

- `R0.6-CR-2026-05-19-004`: Passed，见 `R0.6-CR-2026-05-19-checkbox-validation-pass.md`。

## Review Ledger

| Review ID | 文件 | Release | Milestone | 状态 | 决策 |
| --- | --- | --- | --- | --- | --- |
| R0.5-CR-2026-05-18-001 | `R0.5-CR-2026-05-18-shared-module-integration.md` | R0.5 Platform Stabilization | M0.5 Shared Module Integration Stabilization | Failed | 不允许进入下一 iteration，必须先修复 P0/P1。 |
| R0.5-CR-2026-05-19-001 | `R0.5-CR-2026-05-19-admin-contract-followup.md` | R0.5 Platform Stabilization | M0.5 Shared Module Integration Stabilization | Failed | 已有进展，但不允许进入下一 iteration，必须先修复客户默认后台不可用、公开 lead list、部署依赖和 migration safety。 |
| R0.5-CR-2026-05-19-002 | `R0.5-CR-2026-05-19-final-stabilization-pass.md` | R0.5 Platform Stabilization | M0.5 Shared Module Integration Stabilization | Failed | P0 已关闭，但不允许进入 M0.6，必须先修复 backend Docker/compose 独立部署路径缺少 shared package。 |
| R0.5-CR-2026-05-19-003 | `R0.5-CR-2026-05-19-docker-context-fix.md` | R0.5 Platform Stabilization | M0.5 Shared Module Integration Stabilization | Passed | R0.5 P0/P1 已关闭；允许进入 M0.6。Docker backend image build 已通过；容器运行时 MySQL 网络配置仍需在 staging 前验证。 |
| R0.6-CR-2026-05-19-001 | `R0.6-CR-2026-05-19-backend-form-engine.md` | R0.6 Dynamic Capability | M0.6 Dynamic Form System | Failed | 不允许进入前端 FormRenderer；必须先修复默认 MySQL 配置、migration 幂等性、schema required 校验、forms 测试和 schema 读取 API。 |
| R0.6-CR-2026-05-19-002 | `R0.6-CR-2026-05-19-dynamic-engine-fix.md` | R0.6 Dynamic Capability | M0.6 Dynamic Form System | Failed | 不允许进入前端 FormRenderer；必须先修复 select/options 后端校验，并统一 endpoint contract、文档、脚本和测试。 |
| R0.6-CR-2026-05-19-003 | `R0.6-CR-2026-05-19-deep-validation-followup.md` | R0.6 Dynamic Capability | M0.6 Dynamic Form System | Failed | select/email 校验、测试和构建已通过；暂不进入前端 FormRenderer，必须先补齐 checkbox boolean 校验。 |
| R0.6-CR-2026-05-19-004 | `R0.6-CR-2026-05-19-checkbox-validation-pass.md` | R0.6 Dynamic Capability | M0.6 Dynamic Form System | Passed | I0.6.1 后端动态表单引擎已通过；允许进入 I0.6.2 Frontend FormRenderer。 |
