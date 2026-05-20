from sqlalchemy.orm import Session
from sqlalchemy import desc
from dandelion_core.modules.leads.models import Lead
from dandelion_core.modules.leads.schemas import LeadCreate
from datetime import datetime

class LeadRepository:
    def __init__(self, session: Session):
        self.session = session

    def create(self, lead_data: LeadCreate) -> Lead:
        db_lead = Lead(**lead_data.model_dump())
        self.session.add(db_lead)
        # P2-1: repository only flush, don't commit
        self.session.flush()
        self.session.refresh(db_lead)
        return db_lead

    def get_by_id(self, lead_id: str) -> Lead:
        return self.session.query(Lead).filter(Lead.lead_id == lead_id).first()

    def list_active_leads(self, limit: int = 50, cursor: datetime = None, status: str = None):
        query = self.session.query(Lead).filter(Lead.archived_at == None)
        
        if status:
            query = query.filter(Lead.status == status)
            
        if cursor:
            query = query.filter(Lead.last_activity_at < cursor)
            
        query = query.order_by(desc(Lead.last_activity_at)).limit(limit)
        return query.all()
