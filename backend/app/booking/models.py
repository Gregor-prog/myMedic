from typing import Optional
from sqlmodel import Field, SQLModel
from uuid import UUID, uuid4
from datetime import datetime
from enum import Enum

class AppointmentStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class AppointmentBase(SQLModel):
    start_time: datetime
    end_time: datetime
    status: AppointmentStatus = Field(default=AppointmentStatus.PENDING)
    notes: Optional[str] = None

class Appointment(AppointmentBase, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    patient_id: UUID = Field(foreign_key="user.id")
    professional_id: UUID = Field(foreign_key="professionalprofile.id")
    
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
