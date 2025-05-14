from datetime import datetime
from pydantic import BaseModel
from typing import Optional

class CommentBase(BaseModel):
    title: str
    content: str
    restaurant_id: int
    tag_id: int
    user_id: int

class CommentCreate(CommentBase):
    created_at: Optional[datetime] = None

class CommentUpdate(CommentBase):
    pass

class Comment(CommentBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
