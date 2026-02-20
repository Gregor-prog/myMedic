from typing import Any, List
from uuid import UUID
from fastapi import APIRouter, Depends
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.core.db import get_db

from app.comms.models import ChatMessage
from app.comms.schemas import ChatMessageRead, ChatMessageCreate
from app.auth.models import User
from app.auth.security import get_current_user

router = APIRouter()

@router.get("/history/{thread_id}", response_model=List[ChatMessageRead])
async def get_chat_history(
    thread_id: UUID,
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Get message history for a thread.
    """
    query = select(ChatMessage).where(
        ChatMessage.thread_id == thread_id
    ).order_by(ChatMessage.timestamp)
    result = await db.exec(query)
    return result.all()

@router.post("/messages", response_model=ChatMessageRead)
async def send_message(
    message_in: ChatMessageCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> Any:
    """
    Send a new chat message.
    Inserts into DB — Supabase Realtime automatically broadcasts the change
    to any subscribed clients.
    """
    message = ChatMessage(
        content=message_in.content,
        thread_id=message_in.thread_id,
        sender_id=current_user.id,
    )
    db.add(message)
    await db.commit()
    await db.refresh(message)
    return message
