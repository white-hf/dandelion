from sqlalchemy.orm import Session
from dandelion_core.modules.forms.repository import FormRepository
from dandelion_core.modules.leads.repository import LeadRepository
from dandelion_core.modules.events.repository import EventRepository
from dandelion_core.modules.leads.schemas import LeadCreate
from dandelion_core.modules.events.schemas import EventCreate
from dandelion_core.modules.forms.schemas import GenericSubmission
from fastapi import HTTPException
import re

class FormService:
    def __init__(self, db: Session):
        self.db = db
        self.form_repo = FormRepository(db)
        self.lead_repo = LeadRepository(db)
        self.event_repo = EventRepository(db)

    def submit_form(self, submission: GenericSubmission):
        # 1. Fetch form config
        config = self.form_repo.get_config(submission.form_key)
        if not config:
            raise HTTPException(status_code=404, detail=f"Form configuration '{submission.form_key}' not found.")

        # 2. Deep Schema Validation
        schema = config.schema_json
        fields = schema.get('fields', [])
        
        errors = []
        for field_cfg in fields:
            name = field_cfg['name']
            val = submission.data.get(name)
            
            # A. Required Check
            if field_cfg.get('required') and (val is None or val == ""):
                errors.append(f"Field '{name}' is required")
                continue
            
            if val is None or val == "":
                continue

            # B. Type-specific validation
            f_type = field_cfg.get('type')
            
            if f_type == "email":
                if not re.match(r"[^@]+@[^@]+\.[^@]+", str(val)):
                    errors.append(f"Field '{name}' must be a valid email")
            
            elif f_type == "select":
                options = field_cfg.get('options', [])
                if val not in options:
                    errors.append(f"Value '{val}' for '{name}' is not a valid option. Allowed: {', '.join(options)}")
            
            elif f_type == "checkbox":
                if not isinstance(val, bool):
                    errors.append(f"Field '{name}' must be a boolean (true/false)")

        if errors:
            raise HTTPException(status_code=422, detail={"errors": errors})

        # 3. Create Lead
        lead_data = LeadCreate(
            contact_name=submission.contact_name,
            email=submission.email,
            phone=submission.phone,
            business_name=submission.business_name,
            industry=submission.industry or config.industry,
            module_source=config.module_source,
            form_key=submission.form_key,
            source=submission.source,
            medium=submission.medium,
            campaign=submission.campaign,
            consent=submission.consent,
            custom_fields=submission.data
        )
        lead = self.lead_repo.create(lead_data)

        # 4. Create Event
        event_data = EventCreate(
            event_type="form_submit",
            lead_id=lead.lead_id,
            source=submission.source,
            medium=submission.medium,
            campaign=submission.campaign,
            module_source=config.module_source,
            form_key=submission.form_key,
            metadata={"form_key": submission.form_key, "industry": config.industry}
        )
        self.event_repo.create(event_data)

        self.db.commit()
        return lead
