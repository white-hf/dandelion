from sqlalchemy.orm import Session
from sqlalchemy import func
from dandelion_core.modules.leads.models import Lead
from dandelion_core.modules.events.models import Event

class DashboardService:
    def __init__(self, db: Session):
        self.db = db

    def get_stats(self):
        total_leads = self.db.query(func.count(Lead.lead_id)).filter(Lead.archived_at == None).scalar()
        
        # Audit submits (based on form_key)
        audit_submits = self.db.query(func.count(Lead.lead_id)).filter(
            Lead.form_key == "audit_request",
            Lead.archived_at == None
        ).scalar()
        
        # Event counts
        booking_clicks = self.db.query(func.count(Event.event_id)).filter(Event.event_type == "booking_click").scalar()
        cta_clicks = self.db.query(func.count(Event.event_id)).filter(Event.event_type == "cta_click").scalar()
        
        # Status distribution
        status_counts = self.db.query(Lead.status, func.count(Lead.lead_id)).filter(
            Lead.archived_at == None
        ).group_by(Lead.status).all()
        statuses = [{"status": s, "count": c} for s, c in status_counts]
        
        # Source distribution
        source_counts = self.db.query(Lead.source, func.count(Lead.lead_id)).filter(
            Lead.archived_at == None
        ).group_by(Lead.source).all()
        sources = [{"source": s or "direct", "count": c} for s, c in source_counts]
        
        return {
            "total_leads": total_leads or 0,
            "audit_submits": audit_submits or 0,
            "booking_clicks": booking_clicks or 0,
            "cta_clicks": cta_clicks or 0,
            "statuses": statuses,
            "sources": sources
        }
