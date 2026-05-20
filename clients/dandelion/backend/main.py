import sys
import os
from pathlib import Path
from fastapi import FastAPI

# Base directory of the current file
BASE_DIR = Path(__file__).resolve().parent

# --- Shared Module Path Logic ---
try:
    from dandelion_core.config.client_config import ClientConfig
except ImportError:
    PROJECT_ROOT = BASE_DIR.parent.parent.parent
    core_path = str(PROJECT_ROOT / "packages" / "backend")
    if core_path not in sys.path:
        sys.path.append(core_path)
    from dandelion_core.config.client_config import ClientConfig

from dandelion_core.database.connection import get_engine, get_session_factory
from dandelion_core.modules.leads.router import create_leads_router
from dandelion_core.modules.events.router import create_events_router
from dandelion_core.modules.dashboard.router import create_dashboard_router
from dandelion_core.modules.admin_crm.router import create_admin_crm_router
from dandelion_core.modules.forms.router import create_forms_router

# Load client-specific environment
config = ClientConfig.from_env(BASE_DIR / ".env")

engine = get_engine(config.database_url)
SessionFactory = get_session_factory(engine)

def get_db():
    db = SessionFactory()
    try:
        yield db
    finally:
        db.close()

app = FastAPI(title=config.project_name)

# Include core modules
app.include_router(create_leads_router(config, get_db), prefix="/api")
app.include_router(create_events_router(config, get_db), prefix="/api")
app.include_router(create_dashboard_router(config, get_db), prefix="/api")
app.include_router(create_admin_crm_router(config, get_db), prefix="/api")
app.include_router(create_forms_router(config, get_db), prefix="/api")

@app.get("/")
async def root():
    return {"message": f"Welcome to {config.project_name} API", "status": "online"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
