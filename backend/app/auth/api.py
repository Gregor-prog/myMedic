from typing import Any
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from jose import jwt, JWTError

from app.core.db import get_db
from app.core.config import settings
from app.auth.models import User
from app.auth.schemas import ProfileSync, UserRead
from app.auth.security import get_current_user

router = APIRouter()

# Lightweight JWT parser that doesn't require user to exist in DB yet
security = HTTPBearer()

async def get_auth_payload(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> dict:
    """
    Parse Supabase JWT and return the payload (sub, email).
    Does NOT look up the user in the DB — used for profile sync.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            credentials.credentials,
            settings.SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            audience="authenticated",
        )
        user_id = payload.get("sub")
        email = payload.get("email")
        if not user_id:
            raise credentials_exception
        return {"id": user_id, "email": email}
    except JWTError:
        raise credentials_exception


@router.post("/sync-profile", response_model=UserRead)
async def sync_profile(
    profile_in: ProfileSync,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
    auth_data: dict = Depends(get_auth_payload),
) -> Any:
    """
    Create or update a user profile after Supabase Auth signup/login.
    Called by the frontend immediately after a successful signup.
    The user's ID and email come from the Supabase JWT.
    """
    auth_uid = UUID(auth_data["id"])
    email = auth_data["email"]
    
    # Check if profile already exists
    result = await db.exec(select(User).where(User.id == auth_uid))
    existing_user = result.first()
    
    if existing_user:
        # Update existing profile
        existing_user.full_name = profile_in.full_name
        if profile_in.phone_number:
            existing_user.phone_number = profile_in.phone_number
        db.add(existing_user)
        await db.commit()
        await db.refresh(existing_user)
        return existing_user
    
    # Create new profile linked to Supabase auth user
    user = User(
        id=auth_uid,
        email=email,
        full_name=profile_in.full_name,
        phone_number=profile_in.phone_number,
        role=profile_in.role,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)

    # Trigger Welcome Email (Phase 5) via Background Task
    from app.core.emails import email_service
    background_tasks.add_task(email_service.send_welcome_email, email, profile_in.full_name)

    return user


@router.get("/me", response_model=UserRead)
async def read_users_me(
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Get current user profile.
    """
    return current_user
