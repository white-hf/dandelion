from sqlalchemy.orm import Session
from dandelion_core.modules.leads.repository import LeadRepository
from dandelion_core.modules.leads.schemas import LeadCreate
from dandelion_core.modules.leads.models import Lead

class LeadService:
    def __init__(self, session: Session):
        self.session = session
        self.repository = LeadRepository(session)

    def process_new_submission(self, lead_data: LeadCreate) -> Lead:
        # Business logic here
        lead = self.repository.create(lead_data)
        # P2-1: Service handles commit
        self.session.commit()
        return lead

    def get_leads_for_admin(self, limit: int = 50, cursor_str: str = None, status: str = None):
        from datetime import datetime
        cursor = None
        if cursor_str:
            try:
                cursor = datetime.fromisoformat(cursor_str)
            except ValueError:
                pass
        return self.repository.list_active_leads(limit=limit, cursor=cursor, status=status)
