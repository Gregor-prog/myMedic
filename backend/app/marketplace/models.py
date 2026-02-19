from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship
from uuid import UUID, uuid4

from app.auth.models import User

class ProfessionalProfileBase(SQLModel):
    bio: str
    specialty: str = Field(index=True)
    location: str
    years_experience: int
    is_verified: bool = False
    rating: float = 0.0
    consultation_fee: float

class ProfessionalProfile(ProfessionalProfileBase, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="user.id")
    
    # Relationship to User (One-to-One mostly)
    # user: Optional[User] = Relationship(back_populates="professional_profile")  # Needs update in User model to work bi-directionally
