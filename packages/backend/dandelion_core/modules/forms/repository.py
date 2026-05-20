from sqlalchemy.orm import Session
from dandelion_core.modules.forms.models import FormConfig
from typing import Optional

class FormRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_config(self, form_key: str) -> Optional[FormConfig]:
        return self.db.query(FormConfig).filter(FormConfig.form_key == form_key, FormConfig.active == True).first()

    def create_config(self, config_data: dict) -> FormConfig:
        db_config = FormConfig(**config_data)
        self.db.add(db_config)
        self.db.flush()
        return db_config
