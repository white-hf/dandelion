# 多智能体协同开发指南 (AI Agents Workflow)
## 专为北美 SMB 定制化网站平台设计

**文档版本:** 1.2 (Review Gate 强化版)
**最近更新:** 2026-05-20
**项目位置:** /Users/whitetang/Desktop/work/website

---

### 1. 为什么需要多智能体 (Multi-Agent) 协同？
在 V3.0+ 架构中，我们要以“打字机”的速度交付“硅谷级”的代码。通过划分不同专业的 Agent，我们可以确保每一段代码都由“领域专家”生成。更重要的是，本指南 1.2 版将**防御性工程原则**升级为**强制 Review Gate**：没有证据，不算完成；没有真实 client app smoke，不算可交付。

### 2. 核心 Agent 角色定义
*(Agent 1-4 角色保持不变)*

### 3. 工程卓越与自检原则 (NEW: 核心改进项)

每个 Agent 在声明任务“Passed”之前，必须遵循以下四大防御性原则：

#### 原则 A: 环境隔离与“容器化模拟” (DevOps Focus)
*   **原则:** 严禁依赖宿主机的“隐含路径”或已存在的 .venv。
*   **自检项:** 假设宿主机只有 Docker。我写的 Dockerfile 复制了所有依赖（包括 Monorepo 中的 shared packages）吗？
*   **行动:** 每次修改目录结构或共享包引用，必须更新并验证 docker-compose.yml 的 context。

#### 原则 B: 深层负向校验 (Backend/Architect Focus)
*   **原则:** “Happy Path”通过只是 60 分。非法输入的防御力决定了系统的专业度。
*   **自检项:** 
    *   如果 API 收到 null 会崩溃吗？
    *   对于 select 类型，如果传入不在 options 里的值，后端会拒绝并返回 422 吗？
    *   正则校验（Email/Phone）是否已在 Service 层强制执行？
*   **行动:** 单元测试必须包含至少 2 个负向/边界用例。

#### 原则 C: 安全即底座，非补丁 (Security Focus)
*   **原则:** 任何涉及 PII (个人隐私数据) 的接口，第一行代码必须是鉴权。
*   **自检项:** 
    *   这个 GET 接口返回的是否包含敏感信息？如果是，它有 X-Admin-Key 保护吗？
    *   我是否不小心把数据库明文密码写进了代码或默认配置文件？
*   **行动:** 严禁在 Iteration 结束时留下“临时不带鉴权”的公开接口。

#### 原则 D: 全域契约一致性 (Monorepo Integrity)
*   **原则:** 代码是真相，但脚本和文档必须是同步的真相。
*   **自检项:** 
    *   我修改了 API 路径，全局搜索并更新了所有的 scripts/*.sh, tests/*.py 以及 README.md 吗？
    *   前端 lib/api.ts 的导出方法名与后端 router.py 是否 100% 匹配？
*   **行动:** 任何重构后，执行全域搜索 (grep) 确认足迹。

---

### 4. Agent 协同开发标准工作流 (SOP)

1.  **[立项与构思]** Agent 1 输出 PRD 和合规清单。
2.  **[接口契约]** Agent 3 设计 API 规范，Agent 4 同步检查 Docker context 兼容性。
3.  **[双轨开发]** Agent 2 (前端) 与 Agent 3 (后端) 开发。
4.  **[防御性自测]** **(NEW)** Agent 3 运行包含负向路径的 pytest；Agent 4 模拟容器构建。
5.  **[交付演示]** 运行 setup_environment.sh 并发布演示链接。

---

### 4.1 强制 Pre-Handoff Gate

任何 Agent 在请求 Reviewer review 前，必须贴出以下命令和结果。缺少任意一项，默认视为 `Not Ready for Review`。

#### Gate A: 工作区状态

```bash
git status --short --branch
git log --oneline --decorate -5
```

要求：

*   必须说明哪些文件是本次修改。
*   不允许把未提交代码描述为“已提交”。
*   不允许混入无关本地产物、缓存、数据库文件或 `.env` 明文文件。

#### Gate B: 自动化测试

```bash
cd packages/backend
.venv/bin/python -m pytest -q
```

```bash
cd clients/dandelion/frontend
npm run build
```

要求：

*   必须贴出测试数量，例如 `7 passed`。
*   如果测试数量比上一轮 Passed review 减少，必须解释原因；否则自动视为 P1。
*   pytest warning 不能忽略；必须说明是否影响质量。

#### Gate C: 真实 Client App Smoke

必须使用 `clients/dandelion/backend` 的真实配置路径验证，不允许只用 SQLite pytest 代替。

最小 smoke 内容：

```text
main.config.database_url startswith mysql+pymysql://
main.config.admin_api_key is loaded
GET /api/forms/audit_request -> 200
GET /api/forms/hvac_quote -> 200
POST /api/forms/submit valid audit -> 200
POST /api/forms/submit invalid select/email/checkbox -> 422
GET or POST /api/events/ -> 200, and event metadata/payload persisted
GET /api/admin/dashboard without key -> 401
GET /api/admin/dashboard with key -> 200
Admin detail/timeline/notes/export with key -> 200
Admin detail/timeline/notes/export without key -> 401
```

如果真实 client app 回退 SQLite，自动 P0。

#### Gate D: 全域契约搜索

每次改 API、schema、字段名、路由、migration 后必须执行全域搜索：

```bash
rg -n "metadata|payload|/api/submissions|/api/forms/submit|/api/admin/leads/export|schema_json|config_schema" packages clients scripts docs -S
```

要求：

*   字段名必须前后端、脚本、文档一致。
*   API method/path 必须前端 caller 与后端 router 一致。
*   历史 review 文档可以保留旧信息，但当前计划、脚本、测试不能漂移。

#### Gate E: 数据库与 Migration 验证

涉及 DB schema、index、migration 的任务必须贴出：

```sql
SHOW COLUMNS FROM <table>;
SHOW INDEX FROM <table>;
```

要求：

*   禁止只修改历史 `0001_initial_schema.sql` 来表示已有库已迁移。
*   对已有表的列名变更必须新增安全、幂等 migration。
*   `CREATE TABLE IF NOT EXISTS` 不等于已迁移已有表。
*   任何新增 list/filter/timeline/export 查询都要说明使用哪个 index。

---

### 4.2 API Contract Matrix

每次新增或修改 API，架构师必须在 implementation summary 中提供契约矩阵。

格式：

| Capability | Frontend caller | Method | Path | Backend router | Test |
| --- | --- | --- | --- | --- | --- |
| CSV export | `exportLeadsCsv` | GET | `/api/admin/leads/export/csv` | `admin_crm.router.export_leads` | `test_admin_export_authorized` |

规则：

*   同一个能力不能出现前端 GET、后端 POST 的不一致。
*   Admin API 必须列出 unauthorized 和 authorized 测试。
*   Public API 必须列出正向和负向测试。

---

### 4.3 Regression Coverage Lock

一旦某个 review 已经 Passed，其核心测试进入回归基线。后续迭代只能追加测试，不允许删除或弱化。

当前永久回归基线：

*   R0.5 admin/dashboard/auth baseline。
*   R0.6.1 form discovery。
*   R0.6.1 valid dynamic submission。
*   R0.6.1 missing required -> `422`。
*   R0.6.1 invalid select -> `422`。
*   R0.6.1 invalid email -> `422`。
*   R0.6.1 invalid checkbox -> `422`。

自动阻断条件：

*   pytest 数量减少且没有合理解释：P1。
*   删除负向测试：P1。
*   只保留 happy path：P1。
*   用新功能测试替换旧 baseline 测试：P1。

---

### 4.4 Event 与 Audit Trail 规则

事件字段名必须全系统统一。推荐标准：

*   API / Pydantic 对外字段使用 `metadata`。
*   SQLAlchemy 如需避免 `Base.metadata` 冲突，使用属性名 `metadata_json = Column("metadata", JSON, ...)`。
*   不要无迁移地把数据库列从 `metadata` 改成 `payload`。

必须写 audit event 的操作：

*   public form submit -> `form_submit`
*   admin status update -> `admin_status_update`
*   lead note create -> `lead_note_created`
*   notification sent/failed -> `notification_sent` / `notification_failed`

Timeline 不是展示装饰，它是审计链。新增后台操作如果不写 event，默认 P1。

---

### 4.5 Handoff Summary 强制模板

架构师请求 review 时，必须提供 implementation summary，并使用以下结构：

```text
Branch:
Commit or working tree state:
Scope:

Changed files by iteration:
- I0.x.y:

API Contract Matrix:
| Capability | Frontend caller | Method | Path | Backend router | Test |

Database changes:
- Migration files:
- Tables changed:
- Indexes added/used:
- SHOW COLUMNS / SHOW INDEX evidence:

Validation:
- pytest: <exact output>
- npm run build: <exact output>
- real client app smoke: <exact output>

Regression baseline:
- R0.5 baseline preserved: yes/no
- R0.6.1 form validation tests preserved: yes/no

Known limitations:
- ...

Deferred work:
- ...
```

禁止使用没有证据的表述：

*   “已验证”
*   “生产级”
*   “完全达标”
*   “所有接口均已保护”

除非同时附上命令输出或测试名称。

### 5. 架构师准则 (Architect Creed)
作为 Agent 系统的执行者，我的 Passed 声明不再仅基于“逻辑无错”，而是基于“环境可复现、数据完整、安全闭环”。

### 6. 长任务自主开发与测试指令 (Autonomous Execution)

为了最大化开发效率并确保交付质量，Agent 在接收到明确的 Iteration 开发指令后，应遵循以下自主执行模式：

*   **全链路闭环授权:** 一旦任务启动，Agent 被授予完整权限执行 **[计划 -> 编码 -> 自动化测试 -> 修复 -> 再测试]** 的循环，直到达成“验收标准”。
*   **非中断原则:** 在实现已批准的技术设计范围内，Agent 不需要中途停下请求单步操作授权。
*   **验证驱动停止:** 只有在以下情况时才应中断并向用户汇报：
    1.  **成功交付:** 所有 P0/P1 测试用例（含负向路径）均已 Passed。
    2.  **遇到不可逾越的阻塞:** 发现技术设计存在根本性缺陷，或遇到环境权限/硬件限制无法继续。
    3.  **任务超时/死循环:** 尝试修复同一个 Bug 超过 3 次仍未成功，需请求架构师介入。
*   **透明记录:** 自主执行期间，Agent 必须通过 \`update_topic\` 保持进度的透明度，确保用户随时可见当前所处阶段。
