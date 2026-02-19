from uuid import UUID
from datetime import datetime
from pydantic import BaseModel

class ChatMessageCreate(BaseModel):
    content: str
    thread_id: UUID

class ChatMessageRead(BaseModel):
    id: UUID
    sender_id: UUID
    content: str
    timestamp: datetime
    thread_id: UUID
    is_read: bool
