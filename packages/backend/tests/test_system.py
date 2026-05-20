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

TEST_DB_URL = "sqlite:///./test_logic.db"

@pytest.fixture(scope="session")
def db_engine():
    engine = create_engine(TEST_DB_URL, connect_args={"check_same_thread": False})
    Base.metadata.create_all(bind=engine)
    
    # Seed a form config for testing (Added 'agree' checkbox)
    with engine.connect() as conn:
        conn.execute(text("""
            INSERT OR REPLACE INTO form_configs 
            (form_key, module_source, version, active, schema_json, created_at, updated_at) 
            VALUES ('test_form', 'test_module', 1, 1, 
            '{"fields": [
                {"name": "need", "required": true}, 
                {"name": "service", "type": "select", "options": ["Repair", "Install"]},
                {"name": "agree", "type": "checkbox"}
            ]}', 
            '2026-05-19', '2026-05-19')
        """))
        conn.commit()
    
    yield engine
    if os.path.exists("./test_logic.db"):
        os.remove("./test_logic.db")

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

# --- PUBLIC ACCESS TESTS ---

def test_form_discovery(client):
    response = client.get("/api/forms/test_form")
    assert response.status_code == 200
    assert response.json()["form_key"] == "test_form"
    assert "schema_json" in response.json()

def test_form_submission_success(client):
    payload = {
        "form_key": "test_form",
        "contact_name": "Dynamic User",
        "email": "dynamic@example.com",
        "data": {"need": "Help", "service": "Repair", "agree": True},
        "consent": True
    }
    response = client.post("/api/forms/submit", json=payload)
    assert response.status_code == 200

def test_form_submission_validation_required(client):
    payload = {
        "form_key": "test_form",
        "contact_name": "Dynamic User",
        "email": "dynamic@example.com",
        "data": {"service": "Repair"}, # Missing 'need'
        "consent": True
    }
    response = client.post("/api/forms/submit", json=payload)
    assert response.status_code == 422
    assert "Field 'need' is required" in str(response.json()["detail"])

def test_form_submission_validation_select(client):
    payload = {
        "form_key": "test_form",
        "contact_name": "Dynamic User",
        "email": "dynamic@example.com",
        "data": {"need": "Help", "service": "InvalidService"},
        "consent": True
    }
    response = client.post("/api/forms/submit", json=payload)
    assert response.status_code == 422
    assert "not a valid option" in str(response.json()["detail"])

def test_form_submission_validation_checkbox(client):
    payload = {
        "form_key": "test_form",
        "contact_name": "Dynamic User",
        "email": "dynamic@example.com",
        "data": {"need": "Help", "agree": "not_bool"}, # Invalid checkbox value
        "consent": True
    }
    response = client.post("/api/forms/submit", json=payload)
    assert response.status_code == 422
    assert "must be a boolean" in str(response.json()["detail"])

# --- ADMIN ACCESS TESTS ---

def test_admin_leads_unauthorized(client):
    response = client.get("/api/admin/leads/")
    assert response.status_code == 401

def test_admin_dashboard_authorized(client):
    headers = {"X-Admin-Key": "test_key"}
    response = client.get("/api/admin/dashboard/", headers=headers)
    assert response.status_code == 200
    assert "total_leads" in response.json()
