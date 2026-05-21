from sqlalchemy.orm import Session
from dandelion_core.modules.events.models import Event
from dandelion_core.modules.events.schemas import EventCreate

class EventRepository:
    def __init__(self, session: Session):
        self.session = session

    def create(self, event_data: EventCreate) -> Event:
        data = event_data.model_dump()
        metadata = data.pop("metadata", {})
        db_event = Event(**data, metadata_json=metadata)
        self.session.add(db_event)
        self.session.flush()
        self.session.refresh(db_event)
        return db_event

    def get_by_lead_id(self, lead_id: str):
        return self.session.query(Event).filter(Event.lead_id == lead_id).order_by(Event.occurred_at.desc()).all()
