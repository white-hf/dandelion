from sqlalchemy.orm import Session
from dandelion_core.modules.leads.repository import LeadRepository
from dandelion_core.modules.events.repository import EventRepository
from dandelion_core.modules.events.schemas import EventCreate
from dandelion_core.modules.notes.repository import NoteRepository
from dandelion_core.modules.notes.schemas import NoteCreate
from datetime import datetime
from fastapi import HTTPException

class AdminCRMService:
    def __init__(self, db: Session):
        self.db = db
        self.lead_repo = LeadRepository(db)
        self.event_repo = EventRepository(db)
        self.note_repo = NoteRepository(db)

    def _log_audit_event(self, lead_id: str, event_type: str, metadata: dict):
        event_data = EventCreate(
            event_type=event_type,
            lead_id=lead_id,
            module_source="admin_crm",
            metadata=metadata
        )
        self.event_repo.create(event_data)

    def list_leads(self, status=None, industry=None, source=None, limit=50, cursor_str=None):
        cursor = None
        if cursor_str:
            try: cursor = datetime.fromisoformat(cursor_str)
            except: pass
        leads = self.lead_repo.list_leads(limit=limit, cursor=cursor, status=status, industry=industry, source=source)
        for lead in leads:
            lead.current_problem = lead.custom_fields.get("current_problem", "")
        return leads

    def get_lead(self, lead_id: str):
        lead = self.lead_repo.get_by_id(lead_id)
        if not lead:
            raise HTTPException(status_code=404, detail="Lead not found")
        lead.current_problem = lead.custom_fields.get("current_problem", "")
        return lead

    def update_status(self, lead_id: str, status: str):
        lead = self.get_lead(lead_id) # P2-3 check
        old_status = lead.status
        lead.status = status

        # P1-4: Audit Event
        self._log_audit_event(lead_id, "admin_status_update", {"from": old_status, "to": status})

        self.db.commit()
        self.db.refresh(lead)
        return lead

    def get_timeline(self, lead_id: str):
        return self.event_repo.get_by_lead_id(lead_id)

    def add_note(self, lead_id: str, note_data: NoteCreate):
        self.get_lead(lead_id) # P2-3 check
        note = self.note_repo.create(lead_id, note_data)

        # P1-4: Audit Event
        self._log_audit_event(lead_id, "lead_note_created", {"author": note.author})

        self.db.commit()
        return note

    def get_notes(self, lead_id: str):
        return self.note_repo.list_by_lead_id(lead_id)
