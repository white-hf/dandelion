from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, Text, ForeignKey
from dandelion_core.database.connection import Base
import uuid

class LeadNote(Base):
    __tablename__ = "lead_notes"

    note_id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    lead_id = Column(String(36), ForeignKey("leads.lead_id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    author = Column(String(255), nullable=False)
    body = Column(Text, nullable=False)
    visibility = Column(String(50), nullable=False, default="internal")
