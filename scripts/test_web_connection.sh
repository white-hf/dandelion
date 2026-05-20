#!/usr/bin/env bash
echo "Testing Frontend -> Backend -> MySQL connection..."

# 1. Start the backend in background (simplified for test)
cd /Users/whitetang/Desktop/work/website/clients/dandelion/backend
export PYTHONPATH="/Users/whitetang/Desktop/work/website/packages/backend"
# Use the python from our venv
BACKEND_BIN="/Users/whitetang/Desktop/work/website/packages/backend/.venv/bin/python3"
$BACKEND_BIN main.py &
BACKEND_PID=$!

sleep 3 # Wait for startup

# 2. Simulate a Lead Submission (matches our new frontend mapping)
curl -s -X POST "http://127.0.0.1:8000/api/leads/" \
     -H "Content-Type: application/json" \
     -d '{
       "contact_name": "Web Test",
       "email": "web@example.com",
       "business_name": "Dandelion Demo",
       "industry": "Software",
       "module_source": "dandelion_website",
       "form_key": "audit_request",
       "consent": true,
       "custom_fields": {"test": "connection"}
     }'

echo -e "\nChecking database for the new lead..."
/usr/local/mysql/bin/mysql -h 127.0.0.1 -u website_user -p'user@Halifax' -D dandelion_website_db -e "SELECT lead_id, contact_name, email FROM leads WHERE contact_name='Web Test';"

kill $BACKEND_PID
echo "Test Complete."
