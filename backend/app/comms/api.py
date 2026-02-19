from typing import Any, List
from uuid import UUID
from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.core.db import get_db, async_session_maker

from app.comms.models import ChatMessage
from app.comms.schemas import ChatMessageRead, ChatMessageCreate
from app.comms.ws_manager import manager
from app.auth.security import get_current_user # Note: WS auth is trickier, simplified here

router = APIRouter()

@router.websocket("/ws/chat/{thread_id}")
async def websocket_endpoint(websocket: WebSocket, thread_id: str):
    await manager.connect(websocket, thread_id)
    try:
        while True:
            data = await websocket.receive_text()
            # In a real app, parse data, validate token if possible (or do it in connect), save to DB
            
            # Simple Echo / Broadcast for now
            # To save to DB, we need a session. Since WS is async, we can use the async session maker directly or get it from dependency if possible (but depends on framework support for WS deps)
            
            # Simplified: just broadcast
            await manager.broadcast(f"Message: {data}", thread_id)
            
            # TODO: Add DB persistence logic here using async_session_maker()
            
    except WebSocketDisconnect:
        manager.disconnect(websocket, thread_id)
        await manager.broadcast("Client left the chat", thread_id)

@router.get("/history/{thread_id}", response_model=List[ChatMessageRead])
async def get_chat_history(
    thread_id: UUID,
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Get message history for a thread.
    """
    query = select(ChatMessage).where(ChatMessage.thread_id == thread_id).order_by(ChatMessage.timestamp)
    result = await db.exec(query)
    return result.all()
