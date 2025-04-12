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

class RestaurantBase(BaseModel):
    address: str
    name: str
    rating: float
    phonenumber: str
    filtered_tags_id: int
    comment_id: int

class RestaurantCreate(RestaurantBase):
    pass

class RestaurantUpdate(RestaurantBase):
    pass

class Restaurant(RestaurantBase):
    restaurant_id: int

    class Config:
        orm_mode = True

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

class TagBase(BaseModel):
    name: str

class TagCreate(TagBase):
    pass

class TagUpdate(TagBase):
    pass

class Tag(TagBase):
    id: int

    class Config:
        orm_mode = True

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

class CosmeticBase(BaseModel):
    name: str

class CosmeticCreate(CosmeticBase):
    date_acquired: datetime

class CosmeticUpdate(CosmeticBase):
    date_acquired: datetime

class Cosmetic(CosmeticBase):
    id: int
    date_acquired: datetime

    class Config:
        orm_mode = True

class AddressBase(BaseModel):
    street: str
    city: str
    state: str
    zip: str

class AddressCreate(AddressBase):
    pass

class AddressUpdate(AddressBase):
    pass

class Address(AddressBase):
    address_id: int

    class Config:
        orm_mode = True
