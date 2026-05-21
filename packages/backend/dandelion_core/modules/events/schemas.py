from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime
from typing import Optional, Dict, Any

class EventCreate(BaseModel):
    event_type: str
    lead_id: Optional[str] = None
    session_id: Optional[str] = None
    visitor_id: Optional[str] = None
    path: Optional[str] = None
    source: Optional[str] = None
    medium: Optional[str] = None
    campaign: Optional[str] = None
    module_source: Optional[str] = None
    form_key: Optional[str] = None
    # Public field name is 'metadata'
    metadata: Dict[str, Any] = Field(default_factory=dict)

    model_config = ConfigDict(populate_by_name=True)

class EventResponse(EventCreate):
    event_id: str
    occurred_at: datetime

    @classmethod
    def model_validate(cls, obj, **kwargs):
        # Handle SQLAlchemy object conversion manually to map metadata_json -> metadata
        if hasattr(obj, "metadata_json"):
            data = {c.name: getattr(obj, c.name) for c in obj.__table__.columns if c.name != "metadata"}
            data["metadata"] = obj.metadata_json
            data["event_id"] = obj.event_id
            data["occurred_at"] = obj.occurred_at
            return cls(**data)
        return super().model_validate(obj, **kwargs)

    model_config = ConfigDict(from_attributes=True)
