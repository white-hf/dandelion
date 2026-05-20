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
    metadata: Dict[str, Any] = Field(default_factory=dict)

class EventResponse(EventCreate):
    event_id: str
    occurred_at: datetime

    model_config = ConfigDict(from_attributes=True)
