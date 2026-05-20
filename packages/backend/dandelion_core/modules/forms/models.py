from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, Boolean, JSON, Integer
from dandelion_core.database.connection import Base

class FormConfig(Base):
    __tablename__ = "form_configs"

    form_key = Column(String(255), primary_key=True)
    module_source = Column(String(255), nullable=False)
    industry = Column(String(255), nullable=True)
    version = Column(Integer, nullable=False, default=1)
    active = Column(Boolean, nullable=False, default=True)
    schema_json = Column(JSON, nullable=False, default=dict)
    created_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
