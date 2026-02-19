from sqlalchemy.ext.asyncio import create_async_engine
from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

# Create Async Engine
# echo=True enables SQL logging for debugging (disable in production)
engine = create_async_engine(
    str(settings.SQLALCHEMY_DATABASE_URI),
    echo=False,
    future=True
)

# Async Session Maker
async_session_maker = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
)

# Dependency for FastAPI Routes
async def get_db():
    async with async_session_maker() as session:
        yield session

# Init DB function (useful for initial table creation if not using Alembic immediately)
async def init_db():
    async with engine.begin() as conn:
        # await conn.run_sync(SQLModel.metadata.drop_all) # WARNING: DELETES DATA
        await conn.run_sync(SQLModel.metadata.create_all)
