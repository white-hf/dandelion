import sys
import os
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from pathlib import Path

# Add packages/backend to sys.path
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(BASE_DIR))

from dandelion_core.database.connection import Base
from dandelion_core.config.client_config import ClientConfig
from dandelion_core.modules.leads.router import create_leads_router
from dandelion_core.modules.events.router import create_events_router
from dandelion_core.modules.dashboard.router import create_dashboard_router
from dandelion_core.modules.admin_crm.router import create_admin_crm_router
from dandelion_core.modules.forms.router import create_forms_router
from fastapi import FastAPI

TEST_DB_URL = "sqlite:///./test_remediation.db"

@pytest.fixture(scope="session")
def db_engine():
    engine = create_engine(TEST_DB_URL, connect_args={"check_same_thread": False})
    Base.metadata.create_all(bind=engine)

    with engine.connect() as conn:
        # Seed comprehensive form config
        conn.execute(text("""
            INSERT OR REPLACE INTO form_configs
            (form_key, module_source, version, active, schema_json, created_at, updated_at)
            VALUES ('test_form', 'test_module', 1, 1,
            '{"fields": [
                {"name": "need", "required": true},
                {"name": "service", "type": "select", "options": ["Repair", "Install"]},
                {"name": "email_field", "type": "email"},
                {"name": "agree", "type": "checkbox"}
            ]}',
            '2026-05-19', '2026-05-19')
        """))
        conn.commit()

    yield engine
    if os.path.exists("./test_remediation.db"):
        os.remove("./test_remediation.db")

@pytest.fixture
def app(db_engine):
    config = ClientConfig(
        project_name="Test Project",
        client_key="test",
        database_url=TEST_DB_URL,
        enabled_modules=["leads", "events", "dashboard", "admin_crm", "forms"],
        admin_api_key="test_key"
    )

    app = FastAPI()
    def get_db():
        SessionFactory = sessionmaker(autocommit=False, autoflush=False, bind=db_engine)
        db = SessionFactory()
        try: yield db
        finally: db.close()

    app.include_router(create_leads_router(config, get_db), prefix="/api")
    app.include_router(create_events_router(config, get_db), prefix="/api")
    app.include_router(create_dashboard_router(config, get_db), prefix="/api")
    app.include_router(create_admin_crm_router(config, get_db), prefix="/api")
    app.include_router(create_forms_router(config, get_db), prefix="/api")
    return app

@pytest.fixture
def client(app):
    return TestClient(app)

def create_test_lead(client):
    payload = {
        "form_key": "test_form",
        "contact_name": "Test User",
        "email": "test@example.com",
        "data": {"need": "Help", "service": "Repair", "agree": True},
        "consent": True
    }
    response = client.post("/api/forms/submit", json=payload)
    return response.json()["lead_id"]

# --- PUBLIC ACCESS & VALIDATION ---

def test_form_discovery(client):
    response = client.get("/api/forms/test_form")
    assert response.status_code == 200

def test_submission_success(client):
    lead_id = create_test_lead(client)
    assert lead_id is not None

def test_validation_required(client):
    payload = {"form_key": "test_form", "contact_name": "x", "email": "x@x.com", "data": {}, "consent": True}
    response = client.post("/api/forms/submit", json=payload)
    assert response.status_code == 422
    assert "required" in str(response.json())

def test_validation_select(client):
    payload = {"form_key": "test_form", "contact_name": "x", "email": "x@x.com", "data": {"need": "y", "service": "Invalid"}, "consent": True}
    response = client.post("/api/forms/submit", json=payload)
    assert response.status_code == 422
    assert "not a valid option" in str(response.json())

def test_validation_email(client):
    payload = {"form_key": "test_form", "contact_name": "x", "email": "x@x.com", "data": {"need": "y", "email_field": "invalid-email"}, "consent": True}
    response = client.post("/api/forms/submit", json=payload)
    assert response.status_code == 422
    assert "valid email" in str(response.json())

def test_validation_checkbox(client):
    payload = {"form_key": "test_form", "contact_name": "x", "email": "x@x.com", "data": {"need": "y", "agree": "not_bool"}, "consent": True}
    response = client.post("/api/forms/submit", json=payload)
    assert response.status_code == 422
    assert "must be a boolean" in str(response.json())

# --- ADMIN ACCESS & AUDIT ---

def test_admin_auth(client):
    assert client.get("/api/admin/leads/").status_code == 401

def test_admin_leads_list(client):
    headers = {"X-Admin-Key": "test_key"}
    response = client.get("/api/admin/leads/", headers=headers)
    assert response.status_code == 200
    assert "leads" in response.json()

def test_admin_lead_detail(client):
    lead_id = create_test_lead(client)
    headers = {"X-Admin-Key": "test_key"}
    response = client.get(f"/api/admin/leads/{lead_id}", headers=headers)
    assert response.status_code == 200
    assert response.json()["contact_name"] == "Test User"

def test_admin_timeline_and_audit(client):
    lead_id = create_test_lead(client)
    headers = {"X-Admin-Key": "test_key"}

    # 1. Update Status
    client.patch(f"/api/admin/leads/{lead_id}/status", headers=headers, json={"status": "won"})

    # 2. Add Note
    client.post(f"/api/admin/leads/{lead_id}/notes", headers=headers, json={"body": "Audit note"})

    # 3. Check Timeline for Audit Events
    resp = client.get(f"/api/admin/leads/{lead_id}/timeline", headers=headers)
    assert resp.status_code == 200
    event_types = [e["event_type"] for e in resp.json()]
    assert "form_submit" in event_types
    assert "admin_status_update" in event_types
    assert "lead_note_created" in event_types

def test_admin_export(client):
    headers = {"X-Admin-Key": "test_key"}
    response = client.get("/api/admin/leads/export/csv", headers=headers)
    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/csv")

def test_dashboard(client):
    headers = {"X-Admin-Key": "test_key"}
    response = client.get("/api/admin/dashboard/", headers=headers)
    assert response.status_code == 200
    assert "total_leads" in response.json()
