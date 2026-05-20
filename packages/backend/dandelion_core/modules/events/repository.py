from sqlalchemy.orm import Session
from dandelion_core.modules.events.models import Event
from dandelion_core.modules.events.schemas import EventCreate

class EventRepository:
    def __init__(self, session: Session):
        self.session = session

    def create(self, event_data: EventCreate) -> Event:
        db_event = Event(**event_data.model_dump())
        self.session.add(db_event)
        self.session.flush()
        self.session.refresh(db_event)
        return db_event
