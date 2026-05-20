from sqlalchemy.orm import Session
from dandelion_core.modules.leads.models import Lead

class AdminCRMService:
    def __init__(self, db: Session):
        self.db = db

    def list_leads(self):
        leads = self.db.query(Lead).filter(Lead.archived_at == None).order_by(Lead.created_at.desc()).all()
        # Extract current_problem from custom_fields
        for lead in leads:
            lead.current_problem = lead.custom_fields.get("current_problem", "")
        return leads

    def update_status(self, lead_id: str, status: str):
        lead = self.db.query(Lead).filter(Lead.lead_id == lead_id).first()
        if lead:
            lead.status = status
            self.db.commit()
            self.db.refresh(lead)
        return lead
