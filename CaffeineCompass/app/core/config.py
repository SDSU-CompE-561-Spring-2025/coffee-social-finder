from functools import lru_cache
from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

load_dotenv()


class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./coffee.db"
    SECRET_KEY: str = "BADEDFF871BF9A65B4A18A53328F4"
    

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()