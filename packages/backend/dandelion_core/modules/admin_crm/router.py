from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from dandelion_core.config.client_config import ClientConfig
from dandelion_core.auth.dependencies import verify_admin_auth
from dandelion_core.modules.admin_crm.service import AdminCRMService
from dandelion_core.modules.admin_crm.schemas import AdminLeadListResponse, AdminLeadResponse, StatusUpdate
from dandelion_core.modules.notes.schemas import NoteCreate, NoteResponse
from dandelion_core.modules.events.schemas import EventResponse
from typing import Optional, List
import csv
import io
from fastapi.responses import StreamingResponse

def create_admin_crm_router(config: ClientConfig, get_db):
    router = APIRouter(prefix="/admin/leads", tags=["admin_crm"])
    auth = [Depends(verify_admin_auth(config))]

    @router.get("/", response_model=AdminLeadListResponse, dependencies=auth)
    def list_leads(
        status: Optional[str] = None,
        industry: Optional[str] = None,
        source: Optional[str] = None,
        limit: int = 50,
        cursor: Optional[str] = None,
        db: Session = Depends(get_db)
    ):
        service = AdminCRMService(db)
        leads = service.list_leads(status=status, industry=industry, source=source, limit=limit, cursor_str=cursor)
        next_cursor = None
        if len(leads) == limit:
            next_cursor = leads[-1].last_activity_at.isoformat()
        return {"leads": [AdminLeadResponse.model_validate(l) for l in leads], "next_cursor": next_cursor}

    @router.get("/export/csv", dependencies=auth)
    def export_leads(status: Optional[str] = None, db: Session = Depends(get_db)):
        service = AdminCRMService(db)
        leads = service.list_leads(status=status, limit=1000)
        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow(["ID", "Date", "Name", "Email", "Phone", "Business", "Industry", "Status", "Source"])
        for l in leads:
            writer.writerow([l.lead_id, l.created_at, l.contact_name, l.email, l.phone, l.business_name, l.industry, l.status, l.source])
        output.seek(0)
        return StreamingResponse(
            io.BytesIO(output.getvalue().encode("utf-8")),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=leads_export.csv"}
        )

    @router.get("/{lead_id}", response_model=AdminLeadResponse, dependencies=auth)
    def get_lead_detail(lead_id: str, db: Session = Depends(get_db)):
        service = AdminCRMService(db)
        return service.get_lead(lead_id)

    @router.patch("/{lead_id}/status", response_model=AdminLeadResponse, dependencies=auth)
    def update_lead_status(lead_id: str, update: StatusUpdate, db: Session = Depends(get_db)):
        service = AdminCRMService(db)
        return service.update_status(lead_id, update.status)

    @router.get("/{lead_id}/timeline", response_model=List[EventResponse], dependencies=auth)
    def get_lead_timeline(lead_id: str, db: Session = Depends(get_db)):
        service = AdminCRMService(db)
        events = service.get_timeline(lead_id)
        # Fix Pydantic V2 warning: use model_validate instead of from_orm
        return [EventResponse.model_validate(e) for e in events]

    @router.post("/{lead_id}/notes", response_model=NoteResponse, dependencies=auth)
    def create_note(lead_id: str, note_in: NoteCreate, db: Session = Depends(get_db)):
        service = AdminCRMService(db)
        return service.add_note(lead_id, note_in)

    @router.get("/{lead_id}/notes", response_model=List[NoteResponse], dependencies=auth)
    def list_notes(lead_id: str, db: Session = Depends(get_db)):
        service = AdminCRMService(db)
        return service.get_notes(lead_id)

    return router
