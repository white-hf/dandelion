from pydantic import BaseModel, EmailStr, HttpUrl, ConfigDict, Field
from datetime import datetime
from typing import Optional, List, Any, Dict

class LeadBase(BaseModel):
    contact_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    business_name: Optional[str] = None
    website_url: Optional[str] = None
    industry: Optional[str] = None
    custom_fields: Dict[str, Any] = Field(default_factory=dict)

class LeadCreate(LeadBase):
    module_source: str
    form_key: str
    source: Optional[str] = None
    medium: Optional[str] = None
    campaign: Optional[str] = None
    consent: bool = False
    consent_text: Optional[str] = None

class LeadResponse(LeadBase):
    lead_id: str
    status: str
    priority: str
    created_at: datetime
    last_activity_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class LeadListResponse(BaseModel):
    items: List[LeadResponse]
    next_cursor: Optional[str] = None
