from uuid import UUID
from datetime import datetime
from pydantic import BaseModel
from app.booking.models import AppointmentStatus

class AppointmentCreate(BaseModel):
    professional_id: UUID
    start_time: datetime
    end_time: datetime
    notes: str | None = None

class AppointmentRead(BaseModel):
    id: UUID
    professional_id: UUID
    patient_id: UUID
    start_time: datetime
    end_time: datetime
    status: AppointmentStatus
    notes: str | None
