import requests
import json
import os
from sqlalchemy import create_engine, text

DB_URL = "mysql+pymysql://website_user:user%40Halifax@127.0.0.1/dandelion_website_db"
API_URL = "http://127.0.0.1:8000/api/forms/submit"

# 1. Seed
engine = create_engine(DB_URL)
with engine.connect() as conn:
    conn.execute(text("""
        INSERT IGNORE INTO form_configs (form_key, module_source, industry, version, active, schema_json, created_at, updated_at)
        VALUES ('hvac_quote', 'industry_pack_hvac', 'HVAC', 1, 1, '{"title": "HVAC"}', NOW(), NOW())
    """))
    conn.commit()
    print("Seeding successful.")

# 2. Submit
payload = {
    "form_key": "hvac_quote",
    "contact_name": "Dynamic HVAC",
    "email": "dynamic@example.com",
    "data": {"furnace_age": "15 years", "urgent": True},
    "consent": True
}
try:
    response = requests.post(API_URL, json=payload, timeout=5)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Request failed: {e}")

# 3. Verify
with engine.connect() as conn:
    result = conn.execute(text("SELECT contact_name, custom_fields FROM leads WHERE contact_name='Dynamic HVAC'")).fetchone()
    print(f"Database Result: {result}")
