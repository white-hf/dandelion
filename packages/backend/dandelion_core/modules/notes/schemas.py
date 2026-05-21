from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

class NoteCreate(BaseModel):
    body: str
    author: Optional[str] = "Admin"
    visibility: Optional[str] = "internal"

class NoteResponse(BaseModel):
    note_id: str
    lead_id: str
    created_at: datetime
    author: str
    body: str
    visibility: str

    model_config = ConfigDict(from_attributes=True)
