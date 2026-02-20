from typing import Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr

# Shared properties
class UserBaseSchema(BaseModel):
    email: EmailStr
    full_name: str
    phone_number: Optional[str] = None
    role: str = "patient"

# Properties for profile sync (after Supabase Auth signup)
class ProfileSync(BaseModel):
    full_name: str
    phone_number: Optional[str] = None
    role: str = "patient"

# Properties to return via API
class UserRead(UserBaseSchema):
    id: UUID
    is_active: bool

# Token data (used internally for JWT parsing)
class TokenData(BaseModel):
    user_id: Optional[str] = None
    email: Optional[str] = None
