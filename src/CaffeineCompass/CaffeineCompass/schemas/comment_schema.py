from datetime import datetime
from pydantic import BaseModel

class CommentBase(BaseModel):
    title: str
    restaurant_id: int
    tags_id: int

class CommentCreate(CommentBase):
    created_at: datetime

class CommentUpdate(CommentBase):
    pass

class Comment(CommentBase):
    comment_id: int
    created_at: datetime

    class Config:
        orm_mode = True
