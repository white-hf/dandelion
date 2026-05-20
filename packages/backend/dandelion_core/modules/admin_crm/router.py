from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from dandelion_core.config.client_config import ClientConfig
from dandelion_core.auth.dependencies import verify_admin_auth
from dandelion_core.modules.admin_crm.service import AdminCRMService
from dandelion_core.modules.admin_crm.schemas import AdminLeadListResponse, AdminLeadResponse, StatusUpdate

def create_admin_crm_router(config: ClientConfig, get_db):
    router = APIRouter(prefix="/admin/leads", tags=["admin_crm"])

    @router.get("/", response_model=AdminLeadListResponse, dependencies=[Depends(verify_admin_auth(config))])
    def list_leads(db: Session = Depends(get_db)):
        service = AdminCRMService(db)
        return {"leads": service.list_leads()}

    @router.patch("/{lead_id}/status", response_model=AdminLeadResponse, dependencies=[Depends(verify_admin_auth(config))])
    def update_lead_status(lead_id: str, update: StatusUpdate, db: Session = Depends(get_db)):
        service = AdminCRMService(db)
        lead = service.update_status(lead_id, update.status)
        if not lead:
            raise HTTPException(status_code=404, detail="Lead not found")
        # Ensure current_problem is populated for response
        lead.current_problem = lead.custom_fields.get("current_problem", "")
        return lead

    return router
