#!/usr/bin/env bash
echo "Testing Dynamic Form Engine (I0.6.1)..."

PROJECT_ROOT="/Users/whitetang/Desktop/work/website"
cd $PROJECT_ROOT/clients/dandelion/backend

export DATABASE_URL="mysql+pymysql://website_user:user%40Halifax@127.0.0.1/dandelion_website_db"
export ADMIN_API_KEY="dandelion_admin_secret_2026"
export PYTHONPATH="$PROJECT_ROOT/packages/backend"

BACKEND_BIN="$PROJECT_ROOT/packages/backend/.venv/bin/python3"

echo "Seeding Form Configs..."
/usr/local/mysql/bin/mysql -h127.0.0.1 -uroot -p"Root@123" -D dandelion_website_db -e "INSERT IGNORE INTO form_configs (form_key, module_source, industry, version, active, schema_json, created_at, updated_at) VALUES ("hvac_quote", "industry_pack_hvac", "HVAC", 1, 1, "{\"title\": \"HVAC\"}", NOW(), NOW());"

$BACKEND_BIN main.py &
BACKEND_PID=$!
sleep 3

echo "Submitting HVAC Lead..."
curl -s -X POST "http://127.0.0.1:8000/api/forms/submit" \
     -H "Content-Type: application/json" \
     -d "{
       "form_key": "hvac_quote",
       "contact_name": "HVAC Prospect",
       "email": "hvac@example.com",
       "data": {"service": "repair"},
       "consent": true
     }"

echo -e "

Checking Database..."
/usr/local/mysql/bin/mysql -h127.0.0.1 -uroot -p"Root@123" -D dandelion_website_db -e "SELECT contact_name, industry, custom_fields FROM leads WHERE contact_name="HVAC Prospect";"

kill $BACKEND_PID
echo "Test Complete."
