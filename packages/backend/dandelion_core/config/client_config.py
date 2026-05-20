from pydantic import BaseModel, Field
from typing import Literal, List, Optional
import os
from dotenv import load_dotenv
from pathlib import Path

class ClientConfig(BaseModel):
    project_name: str = "Dandelion Software"
    client_key: str = "dandelion"
    database_url: str = "sqlite:///./dandelion.db"
    admin_api_key: Optional[str] = None
    enabled_modules: List[str] = Field(default_factory=lambda: ["leads", "events", "notifications", "admin_crm"])
    notification_recipients: List[str] = Field(default_factory=list)
    email_provider: Literal["mock", "smtp", "mailgun", "sendgrid"] = "mock"
    public_base_url: str = "http://localhost:8080"
    privacy_profile: Literal["standard", "health-adjacent", "legal-adjacent"] = "standard"

    @classmethod
    def from_env(cls, env_file: Optional[Path | str] = None):
        if env_file:
            load_dotenv(env_file, override=True)
        else:
            load_dotenv()
            
        # Get modules from env or default
        modules_str = os.getenv("ENABLED_MODULES")
        if modules_str:
            enabled_modules = modules_str.split(",")
        else:
            enabled_modules = ["leads", "events", "notifications", "admin_crm"]

        return cls(
            project_name=os.getenv("PROJECT_NAME", "Dandelion Software"),
            client_key=os.getenv("CLIENT_KEY", "dandelion"),
            database_url=os.getenv("DATABASE_URL", "sqlite:///./dandelion.db"),
            admin_api_key=os.getenv("ADMIN_API_KEY"),
            public_base_url=os.getenv("PUBLIC_BASE_URL", "http://localhost:8080"),
            enabled_modules=enabled_modules,
            notification_recipients=os.getenv("NOTIFICATION_RECIPIENTS", "").split(",") if os.getenv("NOTIFICATION_RECIPIENTS") else []
        )
