from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base



class Restaurant(Base):
    __tablename__ = "restaurant"

    id = Column(Integer, primary_key=True, index=True)
    address = Column(String(200), nullable = False)
    name = Column(String(100), nullable=False)
    rating = Column(Integer)
    phoneNumber = Column(String(15))

    tags = relationship("Tag", back_populates = "restaurants")
    comments = relationship("Comment", back_populates = "restaurant")
    bookmarks = relationship("Bookmark", back_populates="restaurant")