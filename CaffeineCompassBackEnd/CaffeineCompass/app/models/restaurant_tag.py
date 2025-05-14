from sqlalchemy import Column, Integer, String, ForeignKey, Table, Float
from sqlalchemy.orm import relationship
from app.core.database import Base

restaurant_tag_association = Table(
    "restaurant_tag",
    Base.metadata,
    Column("restaurant_id", Integer, ForeignKey("restaurant.id"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tag.id"), primary_key=True)
)

class Restaurant(Base):
    __tablename__ = "restaurant"

    id = Column(Integer, primary_key=True, index=True)
    address = Column(String(200), nullable = False)
    name = Column(String(100), nullable=False)
    rating = Column(Integer)
    phonenumber = Column(String(15))
    lat = Column(Float, nullable=False)  # Add latitude
    lng = Column(Float, nullable=False)  # Add longitude

    tags = relationship("Tag",secondary= restaurant_tag_association, back_populates = "restaurants")
    comments = relationship("Comment", back_populates = "restaurant")

class Tag(Base):
    __tablename__ = "tag"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False)
    description = Column(String(255))  # <-- Add this line

    restaurants = relationship("Restaurant", secondary=restaurant_tag_association, back_populates="tags")
    comments = relationship("Comment", back_populates="tags")