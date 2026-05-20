from pydantic import BaseModel, ConfigDict, Field
from typing import List, Optional, Any, Dict
from datetime import datetime

class FormFieldConfig(BaseModel):
    name: str
    label: str
    type: str  # text, email, phone, select, textarea, checkbox, date
    required: bool = False
    options: Optional[List[str]] = None
    placeholder: Optional[str] = None

class FormConfigResponse(BaseModel):
    form_key: str
    module_source: str
    industry: Optional[str]
    version: int
    # Rename to avoid shadowing BaseModel.schema_json
    config_schema: Dict[str, Any] = Field(alias="schema_json")
    
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

class GenericSubmission(BaseModel):
    form_key: str
    contact_name: str
    email: str
    phone: Optional[str] = None
    business_name: Optional[str] = None
    industry: Optional[str] = None
    data: Dict[str, Any] = Field(default_factory=dict)
    source: Optional[str] = None
    medium: Optional[str] = None
    campaign: Optional[str] = None
    consent: bool = False
