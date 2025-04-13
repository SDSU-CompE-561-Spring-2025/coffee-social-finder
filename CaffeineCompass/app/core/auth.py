from datetime import datetime, timedelta
from typing import Annotated
from fastapi import Depends, HTTPException, APIRouter
from pydantic import BaseModel
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from app.core.database import get_db
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["auth"])


SECRET_KEY = 'p;KCUAz)pNax=fb'
ALGORITHM = "HS256"

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")   
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

class CreateUser(BaseModel):
    username: str
    email: str
    password: str
    created_at: datetime = datetime.now()

class Token(BaseModel):
    access_token: str
    token_type: str

    
