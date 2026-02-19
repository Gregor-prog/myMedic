from typing import Any, List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select

from app.core.db import get_db
from app.auth.models import User
from app.auth.security import get_current_user
from app.marketplace.models import ProfessionalProfile
from app.marketplace.schemas import ProfessionalCreate, ProfessionalRead

router = APIRouter()

@router.get("/", response_model=List[ProfessionalRead])
async def list_professionals(
    skip: int = 0,
    limit: int = 100,
    specialty: Optional[str] = None,
    location: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Search for professionals with optional filters.
    """
    # Join with User table to get name/email
    query = select(ProfessionalProfile, User).join(User)
    
    if specialty:
        query = query.where(ProfessionalProfile.specialty == specialty)
    if location:
        query = query.where(ProfessionalProfile.location.contains(location))
    
    query = query.offset(skip).limit(limit)
    result = await db.exec(query)
    professionals = result.all()
    
    output = []
    for profile, user in professionals:
        output.append(ProfessionalRead(
            **profile.dict(),
            full_name=user.full_name,
            email=user.email,
        ))
    
    return output

@router.get("/{profile_id}", response_model=ProfessionalRead)
async def get_professional_detail(
    profile_id: UUID,
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Get detailed profile of a professional.
    """
    query = select(ProfessionalProfile, User).join(User).where(ProfessionalProfile.id == profile_id)
    result = await db.exec(query)
    match = result.first()
    
    if not match:
        raise HTTPException(status_code=404, detail="Professional not found")
        
    profile, user = match
    return ProfessionalRead(
        **profile.dict(),
        full_name=user.full_name,
        email=user.email,
    )

@router.post("/", response_model=ProfessionalRead)
async def create_professional_profile(
    profile_in: ProfessionalCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Create a professional profile for the current user.
    """
    # Check if profile already exists
    existing = await db.exec(select(ProfessionalProfile).where(ProfessionalProfile.user_id == current_user.id))
    if existing.first():
         raise HTTPException(status_code=400, detail="Profile already exists for this user")
    
    # Create profile
    profile = ProfessionalProfile(
        **profile_in.dict(),
        user_id=current_user.id
    )
    db.add(profile)
    await db.commit()
    await db.refresh(profile)
    
    return ProfessionalRead(
        **profile.dict(),
        full_name=current_user.full_name,
        email=current_user.email,
    )
