from functools import lru_cache
from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict
from configparser import ConfigParser
from typing import ClassVar

load_dotenv()


def config(filename="app/database.ini", section="postgresql"):
    parser = ConfigParser()
    parser.read(filename)
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception(f"Section {section} is not found in the {filename} file")
    return db
                    

class Settings(BaseSettings):
    DATABASE_URL: ClassVar[str] = "postgresql://postgres:coffee@localhost/CaffeineCompass"
    SECRET_KEY: str = "Dfdv0gUS0F"  # Add this line
    #ALGORITHM: str = "HS256"  # Optional: Add if used in your app
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30  # Optional: Add if used in your app

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
    }


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()