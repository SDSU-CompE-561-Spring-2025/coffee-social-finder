from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime


class User(Base):
    __tablename__ = "user_account"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    address_id = Column(Integer, ForeignKey("address.id"))
    username = Column(String, unique=True, nullable=False)

    #   comment this out for the test to work   
    cosmetics = relationship("Cosmetic", back_populates = "user")
    comments = relationship("Comment", back_populates = "user")
    bookmarks = relationship("Bookmark", back_populates= "user")
    address = relationship("Address", back_populates="user", uselist = False)