from pydantic import BaseModel
from typing import Optional
# this is malak's code

class RestaurantBase(BaseModel):
    address: str
    name: str
    rating: float
    phonenumber: str
    lat: float  
    lng: float  

class RestaurantCreate(RestaurantBase):
    pass

class RestaurantUpdate(RestaurantBase):
    pass

class Restaurant(RestaurantBase):
    id: int

    model_config = {
        "from_attributes": True  
    }
