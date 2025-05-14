from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str
    created_at: datetime
    bookmark_id: Optional[int] = None
    filtered_tags_id: Optional[int] = None
    cosmetics_id: Optional[int] = None
    comment_id: Optional[int] = None

class UserUpdate(BaseModel):
    name: str
    email: EmailStr
    password: str
    created_at: datetime
    bookmark_id: Optional[int] = None
    filtered_tags_id: Optional[int] = None
    cosmetics_id: Optional[int] = None
    comment_id: Optional[int] = None

class User(UserBase):
    id: int
    created_at: datetime
    bookmark_id: Optional[int] = None
    filtered_tags_id: Optional[int] = None
    cosmetics_id: Optional[int] = None
    comment_id: Optional[int] = None

    class Config:
        orm_mode = True

"""
OLD:

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

        #added a comment new
"""
