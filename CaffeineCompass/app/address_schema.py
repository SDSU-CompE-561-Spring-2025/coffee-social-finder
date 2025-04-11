from pydantic import BaseModel

class AddressBase(BaseModel):
    street: str
    city: str
    state: str
    zip: str

class Address(AddressBase):
    address_id: int

    class Config:
        orm_mode = True