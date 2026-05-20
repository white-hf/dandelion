from pydantic import BaseModel, ConfigDict
from typing import List, Optional, Any, Dict
from datetime import datetime

class AdminLeadResponse(BaseModel):
    lead_id: str
    created_at: datetime
    business_name: Optional[str]
    contact_name: Optional[str]
    email: Optional[str]
    industry: Optional[str]
    city: Optional[str]
    source: Optional[str]
    status: str
    custom_fields: Dict[str, Any]
    
    # Computed fields for frontend convenience if needed
    current_problem: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class AdminLeadListResponse(BaseModel):
    leads: List[AdminLeadResponse]

class StatusUpdate(BaseModel):
    status: str
