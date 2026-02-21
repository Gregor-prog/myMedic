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
    future=True,
    connect_args={
        "prepared_statement_cache_size": 0,
        "statement_cache_size": 0
    }
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

# Init DB function
async def init_db():
    from urllib.parse import urlparse
    parsed = urlparse(str(settings.SQLALCHEMY_DATABASE_URI))
    print(f"Connecting to database at {parsed.hostname}:{parsed.port} (database: {parsed.path.lstrip('/')})")
    try:
        async with engine.begin() as conn:
            await conn.run_sync(SQLModel.metadata.create_all)
        print("Database initialized successfully.")
    except Exception as e:
        print(f"FAILED to initialize database: {e}")
        raise e
