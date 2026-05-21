from sqlalchemy.orm import Session
from dandelion_core.modules.notes.models import LeadNote
from dandelion_core.modules.notes.schemas import NoteCreate

class NoteRepository:
    def __init__(self, session: Session):
        self.session = session

    def create(self, lead_id: str, note_data: NoteCreate) -> LeadNote:
        db_note = LeadNote(lead_id=lead_id, **note_data.model_dump())
        self.session.add(db_note)
        self.session.flush()
        self.session.refresh(db_note)
        return db_note

    def list_by_lead_id(self, lead_id: str):
        return self.session.query(LeadNote).filter(LeadNote.lead_id == lead_id).order_by(LeadNote.created_at.desc()).all()
