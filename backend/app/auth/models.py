from typing import Optional
from sqlmodel import Field, SQLModel
from uuid import UUID
from datetime import datetime

class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    full_name: str
    role: str = Field(default="patient")  # patient, professional, admin
    is_active: bool = True
    phone_number: Optional[str] = None

class User(UserBase, table=True):
    # id matches Supabase auth.users.id (set during profile sync, not auto-generated)
    id: UUID = Field(primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
