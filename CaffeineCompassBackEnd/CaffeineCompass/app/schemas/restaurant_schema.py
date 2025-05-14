from pydantic import BaseModel
# this is malak's code

class RestaurantBase(BaseModel):
    address: str
    name: str
    rating: float
    phonenumber: str

class RestaurantCreate(RestaurantBase):
    pass

class RestaurantUpdate(RestaurantBase):
    pass

class Restaurant(RestaurantBase):
    id: int

    class Config:
        orm_mode = True
