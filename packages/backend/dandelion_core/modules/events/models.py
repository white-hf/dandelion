from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, JSON, ForeignKey
from dandelion_core.database.connection import Base
import uuid

class Event(Base):
    __tablename__ = "events"

    event_id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    event_type = Column(String(255), nullable=False)
    occurred_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))

    lead_id = Column(String(36), ForeignKey("leads.lead_id", ondelete="SET NULL"), nullable=True)
    session_id = Column(String(255), nullable=True)
    visitor_id = Column(String(255), nullable=True)

    path = Column(String(255), nullable=True)
    referrer = Column(String(255), nullable=True)
    source = Column(String(255), nullable=True)
    medium = Column(String(255), nullable=True)
    campaign = Column(String(255), nullable=True)

    module_source = Column(String(255), nullable=True)
    form_key = Column(String(255), nullable=True)
    metadata_json = Column(JSON, name="metadata", nullable=False, default=dict)
