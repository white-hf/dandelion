from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from dandelion_core.config.client_config import ClientConfig
from dandelion_core.modules.forms.service import FormService
from dandelion_core.modules.forms.schemas import GenericSubmission, FormConfigResponse
from dandelion_core.modules.leads.schemas import LeadResponse

def create_forms_router(config: ClientConfig, get_db):
    router = APIRouter(prefix="/forms", tags=["forms"])

    @router.get("/{form_key}", response_model=FormConfigResponse)
    def get_form_config(form_key: str, db: Session = Depends(get_db)):
        service = FormService(db)
        cfg = service.form_repo.get_config(form_key)
        if not cfg:
            raise HTTPException(status_code=404, detail="Form configuration not found")
        return cfg

    @router.post("/submit", response_model=LeadResponse)
    def submit_generic_form(submission: GenericSubmission, db: Session = Depends(get_db)):
        service = FormService(db)
        # Note: we use /forms/submit instead of /submissions/ to keep it in the same router
        return service.submit_form(submission)

    return router
