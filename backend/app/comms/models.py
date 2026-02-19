from datetime import datetime
from uuid import UUID, uuid4
from sqlmodel import Field, SQLModel

class ChatMessageBase(SQLModel):
    content: str
    thread_id: UUID = Field(index=True) # Could be appointment_id or separate thread_id
    
class ChatMessage(ChatMessageBase, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    sender_id: UUID = Field(foreign_key="user.id")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    is_read: bool = False
