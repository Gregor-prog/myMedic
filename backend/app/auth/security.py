from datetime import datetime, timedelta
from typing import Any, Union, Optional
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, HTTPBearer, HTTPAuthorizationCredentials
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select

from app.core.config import settings
from app.core.db import get_db
from app.auth.models import User
from app.auth.schemas import TokenData

import bcrypt

# ── Password Utilities (kept for server-side admin tasks) ─────
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(
        plain_password.encode("utf-8"), 
        hashed_password.encode("utf-8")
    )

def get_password_hash(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")

# ── Supabase JWT Validation ───────────────────────────────────
# Supabase uses HTTPBearer tokens
security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
) -> User:
    """
    Validate a Supabase-issued JWT and return the corresponding User record.
    Supabase JWTs contain 'sub' = auth.users.id (UUID) and 'email' in the payload.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    token = credentials.credentials
    
    try:
        # Decode the Supabase JWT using the project's JWT secret
        payload = jwt.decode(
            token,
            settings.SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            audience="authenticated",
        )
        
        # Supabase puts the user's UUID in 'sub'
        user_id: str = payload.get("sub")
        email: str = payload.get("email")
        
        if user_id is None:
            raise credentials_exception
            
    except JWTError:
        raise credentials_exception
    
    # Look up the user in our profiles table by Supabase auth ID
    from uuid import UUID
    try:
        auth_uid = UUID(user_id)
    except ValueError:
        raise credentials_exception
    
    result = await db.exec(select(User).where(User.id == auth_uid))
    user = result.first()
    
    if user is None:
        raise credentials_exception
    
    return user
