from typing import Optional
from sqlmodel import Field, SQLModel
from uuid import UUID, uuid4
from datetime import datetime

class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    full_name: str
    role: str = Field(default="patient") # patient, professional, admin
    is_active: bool = True
    phone_number: Optional[str] = None

class User(UserBase, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
