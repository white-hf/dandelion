import sys
import os
import argparse
from pathlib import Path
try:
    from dotenv import load_dotenv
except ModuleNotFoundError:
    load_dotenv = None

# Add packages path
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(BASE_DIR / "packages" / "backend"))

from dandelion_core.database.connection import get_engine, get_session_factory
from dandelion_core.modules.forms.models import FormConfig

def load_env_file(path: str):
    if load_dotenv:
        load_dotenv(path)
        return

    with open(path, "r", encoding="utf-8") as env_file:
        for line in env_file:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            os.environ.setdefault(key, value.strip().strip('"').strip("'"))

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--env-file", default=str(BASE_DIR / "clients" / "dandelion" / "backend" / ".env"))
    args = parser.parse_args()

    if os.path.exists(args.env_file):
        load_env_file(args.env_file)

    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print(f"❌ Error: DATABASE_URL not found in {args.env_file} or environment.")
        sys.exit(1)

    try:
        engine = get_engine(db_url)
        SessionFactory = get_session_factory(engine)
        db = SessionFactory()
    except Exception as e:
        print(f"❌ Error connecting to database: {e}")
        sys.exit(1)

    # 1. Audit Request (Restored all fields)
    audit_config = {
        "form_key": "audit_request",
        "module_source": "dandelion_website",
        "industry": "Software/Marketing",
        "schema_json": {
            "title": "Free growth audit",
            "description": "Show us the leak in your lead flow.",
            "submit_label": "Request the audit",
            "success_message": "Audit request received. We will be in touch shortly.",
            "fields": [
                {"name": "business_name", "label": "Business name", "type": "text", "required": True},
                {"name": "contact_name", "label": "Contact name", "type": "text", "required": True},
                {"name": "email", "label": "Email", "type": "email", "required": True},
                {"name": "phone", "label": "Phone", "type": "phone"},
                {"name": "website_url", "label": "Current website", "type": "text", "placeholder": "https://"},
                {"name": "city", "label": "City / service area", "type": "text"},
                {
                    "name": "industry", "label": "Industry", "type": "select", "required": True,
                    "options": ["Home services", "Clinic / dental", "Law / accounting", "Real estate", "Other"]
                },
                {"name": "current_problem", "label": "What is broken?", "type": "textarea", "required": True},
                {"name": "monthly_lead_goal", "label": "Monthly lead goal", "type": "text"},
                {"name": "marketing_channels", "label": "Current marketing channels", "type": "text", "placeholder": "Google, referrals, ads, social..."},
                {"name": "agree", "label": "I agree to be contacted", "type": "checkbox", "required": True}
            ]
        }
    }

    # 2. HVAC Quote (Restored)
    hvac_config = {
        "form_key": "hvac_quote",
        "module_source": "industry_pack_hvac",
        "industry": "HVAC",
        "schema_json": {
            "title": "Get a Free HVAC Quote",
            "submit_label": "Get My Quote",
            "success_message": "Quote request received.",
            "fields": [
                {"name": "contact_name", "label": "Full Name", "type": "text", "required": True},
                {"name": "email", "label": "Email", "type": "email", "required": True},
                {"name": "phone", "label": "Phone Number", "type": "phone", "required": True},
                {"name": "city", "label": "Postal code", "type": "text", "required": True},
                {
                    "name": "service_type", "label": "Service Needed", "type": "select", "required": True,
                    "options": ["Repair", "Installation", "Maintenance", "Emergency"]
                },
                {
                    "name": "property_type", "label": "Property type", "type": "select",
                    "options": ["Home", "Rental", "Commercial"]
                },
                {"name": "issue", "label": "Issue details", "type": "textarea", "required": True},
                {"name": "agree", "label": "I agree", "type": "checkbox", "required": True}
            ]
        }
    }

    for cfg in [audit_config, hvac_config]:
        existing = db.query(FormConfig).filter(FormConfig.form_key == cfg["form_key"]).first()
        if existing:
            existing.schema_json = cfg["schema_json"]
            existing.industry = cfg["industry"]
            existing.module_source = cfg["module_source"]
            print(f"✅ Updated: {cfg['form_key']}")
        else:
            db.add(FormConfig(**cfg))
            print(f"✅ Created: {cfg['form_key']}")

    db.commit()
    db.close()
    print("🎉 Seeding complete.")

if __name__ == "__main__":
    main()
