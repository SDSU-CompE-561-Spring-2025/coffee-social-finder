from datetime import datetime
from pydantic import BaseModel

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

