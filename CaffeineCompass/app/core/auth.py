from datetime import datetime, timedelta
from typing import Annotated
from starlette import status
from fastapi import Depends, HTTPException, APIRouter
from pydantic import BaseModel
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from app.core.database import get_db
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.models.user import User
from database import SessionLocal

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

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency, create_user_request: CreateUser):
    user = User(
        username=create_user_request.username,
        email=create_user_request.email,
        password=bcrypt_context.hash(create_user_request.password),
        created_at=create_user_request.created_at,
    )
    db.add(user)
    db.commit()
