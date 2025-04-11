from pydantic import BaseModel
from datetime import datetime
class Comments(BaseModel):
    title: str

class Create_Comment(Comments):
    comment_id: int

class Create_at(Comments):
    created_at: datetime 

class Restaurant_id(Comments):
    restaurant_id: int

class Tags(Comments):
    tag_id: int


    class Config:
        from_attributes = True
        orm_mode = True
        
    