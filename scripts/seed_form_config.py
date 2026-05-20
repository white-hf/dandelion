import sys
import os
from pathlib import Path

# Add packages path
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(BASE_DIR / "packages" / "backend"))

from dandelion_core.database.connection import get_engine, get_session_factory
from dandelion_core.modules.forms.models import FormConfig
from dotenv import load_dotenv

load_dotenv("/Users/whitetang/Desktop/work/website/clients/dandelion/backend/.env")

engine = get_engine(os.getenv("DATABASE_URL"))
SessionFactory = get_session_factory(engine)
db = SessionFactory()

# 1. HVAC Industry Config
hvac_config = {
    "form_key": "hvac_quote",
    "module_source": "industry_pack_hvac",
    "industry": "HVAC",
    "schema_json": {
        "title": "Get a Free HVAC Quote",
        "submit_label": "Get My Quote",
        "fields": [
            {"name": "service_type", "label": "Service Needed", "type": "select", "options": ["Repair", "Installation", "Maintenance"], "required": True},
            {"name": "home_type", "label": "Home Type", "type": "select", "options": ["Detached", "Townhouse", "Condo"]},
            {"name": "urgency", "label": "How soon?", "type": "select", "options": ["Emergency", "This week", "Just researching"]}
        ]
    }
}

# 2. Dental Industry Config
dental_config = {
    "form_key": "dental_intake",
    "module_source": "industry_pack_dental",
    "industry": "Dental",
    "schema_json": {
        "title": "New Patient Inquiry",
        "submit_label": "Request Appointment",
        "fields": [
            {"name": "insurance", "label": "Insurance Provider", "type": "text"},
            {"name": "reason", "label": "Reason for Visit", "type": "textarea", "required": True}
        ]
    }
}

for cfg in [hvac_config, dental_config]:
    existing = db.query(FormConfig).filter(FormConfig.form_key == cfg["form_key"]).first()
    if not existing:
        db.add(FormConfig(**cfg))
        print(f"Seeded form config: {cfg['form_key']}")

db.commit()
db.close()
