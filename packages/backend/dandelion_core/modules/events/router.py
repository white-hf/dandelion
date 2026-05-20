from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from dandelion_core.config.client_config import ClientConfig
from dandelion_core.modules.events.repository import EventRepository
from dandelion_core.modules.events.schemas import EventCreate, EventResponse

def create_events_router(config: ClientConfig, get_db):
    router = APIRouter(prefix="/events", tags=["events"])

    @router.post("/", response_model=EventResponse)
    def track_event(event_in: EventCreate, db: Session = Depends(get_db)):
        repo = EventRepository(db)
        event = repo.create(event_in)
        db.commit()
        return event

    return router
