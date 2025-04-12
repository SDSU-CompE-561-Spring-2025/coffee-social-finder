from datetime import datetime
from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str
    created_at: datetime
    bookmark_id: int
    filtered_tags_id: int
    cosmetics_id: int
    comment_id: int

class UserUpdate(BaseModel):
    name: str
    email: EmailStr
    password: str
    created_at: datetime
    bookmark_id: int
    filtered_tags_id: int
    cosmetics_id: int
    comment_id: int

class User(UserBase):
    id: int
    created_at: datetime
    bookmark_id: int
    filtered_tags_id: int
    cosmetics_id: int
    comment_id: int

    class Config:
        orm_mode = True

