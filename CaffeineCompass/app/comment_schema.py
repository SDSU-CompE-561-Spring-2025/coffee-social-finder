from pydantic import BaseModel
from datetime import datetime
class CommentBase(BaseModel):
    title: str

class Create_Comment(CommentBase):
    comment_id: int

class Create_at(CommentBase):
    created_at: datetime 

class Restaurant_id(CommentBase):
    restaurant_id: int

class Tags(CommentBase):
    tag_id: int


    class Config:
        from_attributes = True
        orm_mode = True

    