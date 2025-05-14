from pydantic import BaseModel

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
    id: int

    model_config = {
        "from_attributes": True  
    }

