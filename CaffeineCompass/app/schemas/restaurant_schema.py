from pydantic import BaseModel
# this is malak's code

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
