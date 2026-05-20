#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="/Users/whitetang/Desktop/work/website"
DB_NAME="dandelion_website_db"
DB_USER="website_user"
DB_PASS="user@Halifax"
MYSQL_BIN="/usr/local/mysql/bin/mysql"
MIGRATION_DIR="${PROJECT_ROOT}/packages/backend/dandelion_core/database/migrations"
ADMIN_KEY="dandelion_admin_secret_2026"

echo "Starting Automated Deployment for Dandelion Platform..."

read -sp "MySQL root password: " ROOT_PASS
echo ""

$MYSQL_BIN -h127.0.0.1 -uroot -p"${ROOT_PASS}" <<DBEOF
CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS "${DB_USER}"@"127.0.0.1" IDENTIFIED BY "${DB_PASS}";
CREATE USER IF NOT EXISTS "${DB_USER}"@"localhost" IDENTIFIED BY "${DB_PASS}";
GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO "${DB_USER}"@"127.0.0.1";
GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO "${DB_USER}"@"localhost";
FLUSH PRIVILEGES;
DBEOF

echo "Schema Migration..."
for sql_file in "${MIGRATION_DIR}"/*.sql; do
    echo "Applying $(basename "$sql_file")..."
    $MYSQL_BIN -h127.0.0.1 -u"${DB_USER}" -p"${DB_PASS}" "${DB_NAME}" < "$sql_file"
done

echo "Ensuring Indices..."
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
)

for cmd in "${INDEX_CMDS[@]}"; do
    $MYSQL_BIN -h127.0.0.1 -u"${DB_USER}" -p"${DB_PASS}" "${DB_NAME}" -e "$cmd" 2>/dev/null || true
done

CLIENT_ENV_FILE="/Users/whitetang/Desktop/work/website/clients/dandelion/backend/.env"
mkdir -p "/Users/whitetang/Desktop/work/website/clients/dandelion/backend"
printf "PROJECT_NAME="Dandelion Software"
DATABASE_URL="mysql+pymysql://${DB_USER}:user%40Halifax@127.0.0.1/${DB_NAME}"
ADMIN_API_KEY="${ADMIN_KEY}"
ENV=development
PORT=8000
" > "${CLIENT_ENV_FILE}"

echo "Deployment Automation Complete!"
