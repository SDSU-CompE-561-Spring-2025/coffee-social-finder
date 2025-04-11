from datetime import datetime
from pydantic import BaseModel, constr, Field


class CosmeticBase(BaseModel):
    name: constr(min_length=1, max_length=100)  # name is required


class CosmeticCreate(CosmeticBase):
    date_acquired: datetime


class Cosmetic(CosmeticBase):
    id: int = Field(..., gt=0)
    date_acquired: datetime

    class Config:
        from_attributes = True

class CosmeticResponse(BaseModel):
    id: int = Field(..., gt=0)
    name: str
    date_acquired: datetime

    class Config:
        from_attributes = True