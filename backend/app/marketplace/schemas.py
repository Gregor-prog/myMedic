from uuid import UUID
from pydantic import BaseModel
from typing import Optional

class ProfessionalBaseSchema(BaseModel):
    bio: str
    specialty: str
    location: str
    years_experience: int
    consultation_fee: float

class ProfessionalCreate(ProfessionalBaseSchema):
    pass

class ProfessionalRead(ProfessionalBaseSchema):
    id: UUID
    user_id: UUID
    is_verified: bool
    rating: float
    full_name: str  # From User
    email: str      # From User
