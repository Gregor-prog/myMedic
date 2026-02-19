from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.db import init_db
from app.auth.api import router as auth_router
from app.marketplace.api import router as marketplace_router
from app.booking.api import router as booking_router
from app.comms.api import router as comms_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB
    await init_db()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan,
)

if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin).rstrip("/") for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

from fastapi import APIRouter

api_router = APIRouter()
api_router.include_router(auth_router, prefix="/auth", tags=["Auth"])
api_router.include_router(marketplace_router, prefix="/professionals", tags=["Marketplace"])
api_router.include_router(booking_router, prefix="/appointments", tags=["Booking"])
api_router.include_router(comms_router, tags=["Comms"])

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {"message": "Welcome to MyMedic API - Secure & Private", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}
