# Dandelion 自动化部署运行手册 (Launch Runbook)

**文档版本:** 2.1 (Automated Edition)
**适用环境:** Mac 本地开发 / Demo 演示

---

## 1. 自动化部署流程 (一键部署)

我们已经将复杂的数据库安装、用户授权、表结构初始化和配置文件同步封装在了一个脚本中。

### 运行步骤：

1.  **确保 MySQL 服务已启动:**
    在 Mac 系统设置中确认 MySQL 为 "Running" 状态。
2.  **执行部署脚本:**
    ```bash
    cd /Users/whitetang/Desktop/work/website
    ./scripts/setup_environment.sh
    ```
3.  **输入权限:**
    脚本会提示您输入 MySQL root 用户的密码，以便自动创建 dandelion_website_db 数据库并为业务账号 website_user 授权。

---

## 2. 脚本完成的工作内容

*   **数据库安装与初始化:** 检查并创建 dandelion_website_db。
*   **用户管理:** 自动创建/更新 website_user 用户，并授予对该库的全部权限。
*   **表结构同步:** 自动运行 0001_initial_schema.sql，创建 leads 和 events 表及相关索引。
*   **配置自动化:** 在 clients/dandelion/backend/ 下自动生成 .env 文件，确保后端能立即连接到正确的 MySQL 实例。

---

## 3. 启动应用

部署脚本运行成功后，您可以启动后端服务：

```bash
cd /Users/whitetang/Desktop/work/website/clients/dandelion/backend
# 确保已安装依赖 (推荐在虚拟环境中)
source .venv/bin/activate
pip install -r requirements.txt python-dotenv
python3 main.py
```

---

## 4. 故障排除

*   **MySQL Root 拒绝访问:** 请确保您输入的 root 密码正确。
*   **模块导入错误:** 确保您的 PYTHONPATH 包含 packages/backend 目录。
