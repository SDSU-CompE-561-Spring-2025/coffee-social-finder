from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime

class Bookmark(Base):
    __tablename__ = "bookmark"   

    id = Column(Integer, primary_key=True, index=True)     
    name = Column(String(100), nullable= False)
    date_marked = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey('user_account.id'), index = True)
    restaurant_id = Column(Integer, ForeignKey('restaurant.id'), index = True)

    user = relationship("User", back_populates = "bookmarks")
    restaurant = relationship("Restaurant", back_populates= "bookmarks")