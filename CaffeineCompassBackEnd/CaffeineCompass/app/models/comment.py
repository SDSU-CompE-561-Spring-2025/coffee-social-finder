from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime

class Comment(Base):

    __tablename__ = "comment"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable = False)
    content = Column(String(500), nullable = False)
    created_at = Column(DateTime, default=datetime.utcnow)

    restaurant_id = Column(Integer, ForeignKey('restaurant.id'), index = True)
    user_id = Column(Integer, ForeignKey('users.id'), index=True)
    tag_id = Column(Integer, ForeignKey("tag.id"))

    #   comment this out for the test to work   
    user = relationship("User", back_populates= "comments")
    restaurant = relationship("Restaurant", back_populates= "comments")
    tags = relationship("Tag", back_populates= "comments")
