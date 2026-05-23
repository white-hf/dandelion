# Review Ledger and Rules

**来源:** 拆分自 `docs/delivery/Iteration_Plan.md`。

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
| R0.7-CR-2026-05-21-final-internal-experience-pass | `docs/delivery/reviews/R0.7-CR-2026-05-21-final-internal-experience-pass.md` | R0.7 | M0.7 | Passed | R0.6/R0.7 内部体验版闭环通过；允许进入 R0.8 AI Reputation Website Engine MVP。 |
| R0.7-CR-2026-05-21-tailwind-v4-remediation-pass | `docs/delivery/reviews/R0.7-CR-2026-05-21-tailwind-v4-remediation-pass.md` | R0.7 | M0.7 | Passed with P2 follow-ups | Tailwind v4 样式生成问题已关闭；依赖 pinning 与旧 config 清理进入后续维护。 |

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
