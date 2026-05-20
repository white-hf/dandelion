from pydantic import BaseModel, ConfigDict
from typing import List, Dict

class DashboardResponse(BaseModel):
    total_leads: int
    audit_submits: int
    booking_clicks: int
    cta_clicks: int
    statuses: List[Dict]
    sources: List[Dict]
    
    model_config = ConfigDict(from_attributes=True)
