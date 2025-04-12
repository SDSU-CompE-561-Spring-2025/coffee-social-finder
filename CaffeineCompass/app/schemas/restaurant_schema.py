from pydantic import BaseModel
# same schema as old one (Malak's)

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
