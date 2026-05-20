from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, Boolean, JSON, Text
from dandelion_core.database.connection import Base
import uuid

class Lead(Base):
    __tablename__ = "leads"

    lead_id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    last_activity_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))

    status = Column(String(50), nullable=False, default="new")
    priority = Column(String(50), nullable=False, default="normal")
    lifecycle_stage = Column(String(50), nullable=False, default="new")

    module_source = Column(String(255), nullable=False)
    form_key = Column(String(255), nullable=False)
    industry = Column(String(255), nullable=True)

    contact_name = Column(String(255), nullable=True)
    email = Column(String(255), nullable=True)
    phone = Column(String(255), nullable=True)
    business_name = Column(String(255), nullable=True)
    website_url = Column(String(255), nullable=True)
    city = Column(String(255), nullable=True)
    service_area = Column(String(255), nullable=True)

    source = Column(String(255), nullable=True)
    medium = Column(String(255), nullable=True)
    campaign = Column(String(255), nullable=True)
    referrer = Column(String(255), nullable=True)
    landing_path = Column(String(255), nullable=True)

    summary = Column(Text, nullable=True)
    consent = Column(Boolean, nullable=False, default=False)
    consent_text = Column(Text, nullable=True)
    consent_at = Column(DateTime, nullable=True)

    custom_fields = Column(JSON, nullable=False, default=dict)
    tags = Column(JSON, nullable=False, default=list)

    archived_at = Column(DateTime, nullable=True)
