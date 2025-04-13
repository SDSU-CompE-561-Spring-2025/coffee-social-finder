from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime


restaurant_tag_association = Table(
    "restaurant_tag",
    Base.metadata,
    Column("restaurant_id", Integer, ForeignKey("restaurant.id"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tag.id"), primary_key=True)
)

class Address(Base):

    __tablename__ = "address"

    id = Column(Integer, primary_key=True, index=True)
    street = Column(String(100), nullable = False)
    city = Column(String(50), nullable = False)
    state = Column(String(2), nullable = False)
    zip = Column(String(10), nullable = False)

    user = relationship("User", back_populates = "address")

class Bookmark(Base):
    __tablename__ = "bookmark"   

    id = Column(Integer, primary_key=True, index=True)     
    name = Column(String(100), nullable= False)
    date_marked = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey('user_account.id'), index = True)
    restaurant_id = Column(Integer, ForeignKey('restaurant.id'), index = True)

    user = relationship("User", back_populates = "bookmarks")
    restaurant = relationship("Restaurant", back_populates= "bookmarks")

class Comment(Base):

    __tablename__ = "comment"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable = False)
    content = Column(String(500), nullable = False)
    created_at = Column(DateTime, default=datetime.utcnow)

    restaurant_id = Column(Integer, ForeignKey('restaurant.id'), index = True)
    user_id = Column(Integer, ForeignKey('user_account.id'), index = True)


    user = relationship("User", back_populates= "comments")
    restaurant   = relationship("Restaurant", back_populates= "comments")
    tags = relationship("Tag", back_populates= "comments")

class Cosmetic(Base):

    __tablename__ = "cosmetic"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable= False)
    date_acquired = Column(DateTime, default=datetime.utcnow)
    user_id  = Column(Integer, ForeignKey('user_account.id'), index = True)

    user = relationship("User", back_populates = "cosmetics")

class Restaurant(Base):
    __tablename__ = "restaurant"

    id = Column(Integer, primary_key=True, index=True)
    address = Column(String(200), nullable = False)
    name = Column(String(100), nullable=False)
    rating = Column(Integer)
    phoneNumber = Column(String(15))

    tags = relationship("Tag",secondary= restaurant_tag_association, back_populates = "restaurants")
    comments = relationship("Comment", back_populates = "restaurant")
    bookmarks = relationship("Bookmark", back_populates="restaurant")

class Tag(Base):
    __tablename__ = "tag"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique = True, nullable= False)

    restaurants = relationship("Restaurant",secondary= restaurant_tag_association, back_populates = "tags")
    comments = relationship("Comment", back_populates = "tags")

class User(Base):
    __tablename__ = "user_account"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    cosmetics = relationship("Cosmetic", back_populates = "user")
    comments = relationship("Comment", back_populates = "user")
    bookmarks = relationship("Bookmark", back_populates= "user")
    address = relationship("Address", back_populates="user", uselist = False)