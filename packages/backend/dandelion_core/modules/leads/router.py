from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from dandelion_core.config.client_config import ClientConfig
from dandelion_core.modules.leads.service import LeadService
from dandelion_core.modules.leads.schemas import LeadCreate, LeadResponse

def create_leads_router(config: ClientConfig, get_db):
    router = APIRouter(prefix="/leads", tags=["leads"])

    @router.post("/", response_model=LeadResponse)
    def create_lead(lead_in: LeadCreate, db: Session = Depends(get_db)):
        service = LeadService(db)
        return service.process_new_submission(lead_in)

    return router
