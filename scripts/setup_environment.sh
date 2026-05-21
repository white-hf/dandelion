#!/usr/bin/env bash
set -euo pipefail

DB_NAME="dandelion_website_db"
DB_USER="website_user"
DB_PASS="user@Halifax"
MYSQL_BIN="/usr/local/mysql/bin/mysql"
MIGRATION_DIR="/Users/whitetang/Desktop/work/website/packages/backend/dandelion_core/database/migrations"
ADMIN_KEY="dandelion_admin_secret_2026"

echo "Running Setup..."

# Get Root Password safely
if [ -z "${ROOT_PASS:-}" ]; then
    read -sp "MySQL root password: " ROOT_PASS
    echo ""
fi

# 1. DB & User
$MYSQL_BIN -h127.0.0.1 -uroot -p"${ROOT_PASS}" <<DBEOF
CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS "${DB_USER}"@"127.0.0.1" IDENTIFIED BY "${DB_PASS}";
CREATE USER IF NOT EXISTS "${DB_USER}"@"localhost" IDENTIFIED BY "${DB_PASS}";
GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO "${DB_USER}"@"127.0.0.1";
GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO "${DB_USER}"@"localhost";
FLUSH PRIVILEGES;
DBEOF

# 2. Migrations
$MYSQL_BIN -h127.0.0.1 -u"${DB_USER}" -p"${DB_PASS}" "${DB_NAME}" < "${MIGRATION_DIR}/0001_initial_schema.sql"
$MYSQL_BIN -h127.0.0.1 -u"${DB_USER}" -p"${DB_PASS}" "${DB_NAME}" < "${MIGRATION_DIR}/0002_form_configs.sql"

# 3. Indices
INDEX_CMDS=(
    "CREATE INDEX idx_leads_last_activity ON leads (last_activity_at DESC);"
    "CREATE INDEX idx_leads_status_activity ON leads (status, last_activity_at DESC);"
    "CREATE INDEX idx_leads_industry_activity ON leads (industry, last_activity_at DESC);"
    "CREATE INDEX idx_leads_source_activity ON leads (source, last_activity_at DESC);"
    "CREATE INDEX idx_leads_campaign_activity ON leads (campaign, last_activity_at DESC);"
    "CREATE INDEX idx_leads_form_activity ON leads (module_source, form_key, last_activity_at DESC);"
    "CREATE INDEX idx_events_occurred_type ON events (occurred_at DESC, event_type);"
    "CREATE INDEX idx_events_lead_id ON events (lead_id);"
    "CREATE INDEX idx_events_session_time ON events (session_id, occurred_at DESC);"
    "CREATE INDEX idx_events_source_time ON events (source, occurred_at DESC);"
    "CREATE INDEX idx_events_module_form_time ON events (module_source, form_key, occurred_at DESC);"
    "CREATE INDEX idx_lead_notes_lead_created ON lead_notes (lead_id, created_at DESC);"
    "CREATE INDEX idx_notification_logs_status_retry ON notification_logs (status, next_retry_at);"
    "CREATE INDEX idx_notification_logs_lead_created ON notification_logs (lead_id, created_at DESC);"
    "CREATE INDEX idx_form_configs_industry ON form_configs (industry);"
)
for cmd in "${INDEX_CMDS[@]}"; do
    $MYSQL_BIN -h127.0.0.1 -u"${DB_USER}" -p"${DB_PASS}" "${DB_NAME}" -e "$cmd" 2>/dev/null || true
done

# 4. .env
ENV_FILE="/Users/whitetang/Desktop/work/website/clients/dandelion/backend/.env"
printf "PROJECT_NAME=\"Dandelion Software\"\nDATABASE_URL=\"mysql+pymysql://${DB_USER}:user%%40Halifax@127.0.0.1/${DB_NAME}\"\nADMIN_API_KEY=\"${ADMIN_KEY}\"\nENV=development\nPORT=8000\n" > "${ENV_FILE}"

echo "Done."
