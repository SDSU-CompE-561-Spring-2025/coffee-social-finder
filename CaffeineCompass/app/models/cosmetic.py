from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime

class Cosmetic(Base):

    __tablename__ = "cosmetic"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable= False)
    date_acquired = Column(DateTime, default=datetime.utcnow)
    user_id  = Column(Integer, ForeignKey('user_account.id'), index = True)

    user = relationship("User", back_populates = "cosmetics")
