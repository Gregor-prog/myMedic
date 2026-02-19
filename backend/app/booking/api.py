from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select, col

from app.core.db import get_db
from app.auth.models import User
from app.auth.security import get_current_user
from app.booking.models import Appointment, AppointmentStatus
from app.booking.schemas import AppointmentCreate, AppointmentRead

router = APIRouter()

@router.post("/", response_model=AppointmentRead)
async def book_appointment(
    appt_in: AppointmentCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Book a new appointment.
    Checks for overlapping appointments for the professional.
    """
    # 1. Validation: End time must be after start time
    if appt_in.end_time <= appt_in.start_time:
         raise HTTPException(status_code=400, detail="End time must be after start time")

    # 2. Validation: Check overlap
    # Overlap logic: (StartA < EndB) AND (EndA > StartB)
    query = select(Appointment).where(
        Appointment.professional_id == appt_in.professional_id,
        Appointment.status.in_([AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED]),
        col(Appointment.start_time) < appt_in.end_time,
        col(Appointment.end_time) > appt_in.start_time
    )
    result = await db.exec(query)
    if result.first():
        raise HTTPException(status_code=409, detail="This time slot is already booked.")

    # 3. Create Appointment
    appointment = Appointment(
        **appt_in.dict(),
        patient_id=current_user.id,
        status=AppointmentStatus.PENDING 
    )
    db.add(appointment)
    await db.commit()
    await db.refresh(appointment)
    
    return appointment

@router.get("/my-schedule", response_model=List[AppointmentRead])
async def get_my_appointments(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Get appointments for the current user. 
    If role is patient, returns their bookings.
    If role is professional, returns bookings where they are the provider.
    """
    if current_user.role == "professional":
        # Need to find professional profile id first
        # For simplicity in this MVP, we assume query by professional_id linked to user
        # But wait, Appointment links to ProfessionalProfile.id, not User.id
        # We need to look up the profile first.
        from app.marketplace.models import ProfessionalProfile
        profile_res = await db.exec(select(ProfessionalProfile).where(ProfessionalProfile.user_id == current_user.id))
        profile = profile_res.first()
        if not profile:
             return [] # Or raise error
        
        query = select(Appointment).where(Appointment.professional_id == profile.id)
    else:
        # Patient
        query = select(Appointment).where(Appointment.patient_id == current_user.id)
    
    result = await db.exec(query)
    return result.all()
