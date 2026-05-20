from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from dandelion_core.config.client_config import ClientConfig
from dandelion_core.auth.dependencies import verify_admin_auth
from dandelion_core.modules.dashboard.service import DashboardService
from dandelion_core.modules.dashboard.schemas import DashboardResponse

def create_dashboard_router(config: ClientConfig, get_db):
    router = APIRouter(prefix="/admin/dashboard", tags=["admin_dashboard"])

    @router.get("/", response_model=DashboardResponse, dependencies=[Depends(verify_admin_auth(config))])
    def get_dashboard(db: Session = Depends(get_db)):
        service = DashboardService(db)
        return service.get_stats()

    return router
