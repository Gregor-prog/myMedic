import secrets
from typing import List, Union
from pydantic import AnyHttpUrl, PostgresDsn, computed_field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "MyMedic API"
    
    # SECURITY
    SECRET_KEY: str = "changethis-to-a-secure-secret-key-generated-with-openssl"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    ALGORITHM: str = "HS256"
    
    # CORS
    BACKEND_CORS_ORIGINS: Union[List[str], str] = [
        "http://localhost:3000",
        "http://localhost:4173",  # Vite preview
        "http://localhost:5173",  # Vite default
    ]

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v):
        if isinstance(v, str):
            return [i.strip() for i in v.split(",") if i.strip()]
        return v

    # DATABASE
    # Default to local docker settings if not provided in env
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_USER: str = "mymedic"
    POSTGRES_PASSWORD: str = "mymedic_secure_pass"
    POSTGRES_DB: str = "mymedic_core"
    POSTGRES_PORT: int = 5432

    DATABASE_URL: Union[str, None] = None

    @computed_field
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> Union[PostgresDsn, str]:
        if self.DATABASE_URL:
            # SQLAlchemy asyncpg requires 'postgresql+asyncpg://'
            uri = self.DATABASE_URL
            if uri.startswith("postgresql://") and not uri.startswith("postgresql+asyncpg://"):
                uri = uri.replace("postgresql://", "postgresql+asyncpg://", 1)
            
            # Remove parameters not supported by asyncpg's connect() method
            try:
                from urllib.parse import urlparse, urlunparse, parse_qs, urlencode
                parsed = urlparse(uri)
                query = parse_qs(parsed.query)
                
                # Parameters that cause issues with asyncpg
                for param in ["channel_binding", "sslmode"]:
                    query.pop(param, None)
                
                new_query = urlencode(query, doseq=True)
                uri = urlunparse(parsed._replace(query=new_query))
            except Exception:
                # Fallback to simple replacement if parsing fails
                uri = uri.replace("channel_binding=require", "").replace("sslmode=require", "")
                uri = uri.replace("?&", "?").replace("&&", "&").rstrip("?&")
            
            return uri
        return str(
            PostgresDsn.build(
                scheme="postgresql+asyncpg",
                username=self.POSTGRES_USER,
                password=self.POSTGRES_PASSWORD,
                host=self.POSTGRES_SERVER,
                port=self.POSTGRES_PORT,
                path=self.POSTGRES_DB,
            )
        )

    model_config = SettingsConfigDict(
        case_sensitive=True,
        env_file=".env",
        extra="ignore"
    )

settings = Settings()
