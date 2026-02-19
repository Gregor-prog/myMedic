from typing import Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr

# Shared properties
class UserBaseSchema(BaseModel):
    email: EmailStr
    full_name: str
    phone_number: Optional[str] = None
    role: str = "patient"

# Properties to receive via API on creation
class UserCreate(UserBaseSchema):
    password: str

# Properties to return via API
class UserRead(UserBaseSchema):
    id: UUID
    is_active: bool

# Token Schema
class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: UUID
    role: str

class TokenData(BaseModel):
    email: Optional[str] = None
