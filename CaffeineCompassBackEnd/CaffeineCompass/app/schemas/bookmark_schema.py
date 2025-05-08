from datetime import datetime
from pydantic import BaseModel

class BookmarkBase(BaseModel):
    name: str
    restaurant_name: str

class BookmarkCreate(BookmarkBase):
    date_bookmarked: datetime

class BookmarkUpdate(BookmarkBase):
    date_bookmarked: datetime

class Bookmark(BookmarkBase):
    bookmark_id: int
    date_bookmarked: datetime

    class Config:
        orm_mode = True

