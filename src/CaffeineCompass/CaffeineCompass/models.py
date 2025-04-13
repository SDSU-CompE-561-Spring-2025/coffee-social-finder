from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, create_engine
from sqlalchemy.orm import relationship, sessionmaker, declarative_base
from database import Base
from datetime import datetime

Base = declarative_base()

class RestaurantAssociation(Base):
    __tablename__ = 'restaurant_association'


class CommentAssociation(Base):
    __tablename__ = 'comment_association'

class User(Base):
    __tablename__ = "user_account"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    cosmetics = relationship("Cosmetic", back_populates = "user")
    comments = relationship("Comment", back_populates = "user")
    bookmarks = relationship("Bookmark", back_populates= "user")
    address = relationship("Address", back_populates="user", uselist = False)

class Restaurant(Base):
    __tablename__ = "restaurant"

    id = Column(Integer, primary_key=True, index=True)
    address = Column(String, nullable = False)
    name = Column(String, nullable=False)
    rating = Column(Integer)
    phoneNumber = Column(String)

    tags = relationship("Tag", back_populates = "restaurants")
    comments = relationship("Comment", back_populates = "restaurant")
    bookmarks = relationship("Bookmark", back_populates="restaurant")

class Address(Base):

    __tablename__ = "address"

    id = Column(Integer, primary_key=True, index=True)
    street = Column(String, nullable = False)
    city = Column(String, nullable = False)
    state = Column(String, nullable = False)
    zip = Column(String, nullable = False)

    user = relationship("User", back_populates = "address")

class Tag(Base):
    __tablename__ = "tag"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique = True)

    restaurants = relationship("Restaurant", back_populates = "tags")
    comments = relationship("Comment", back_populates = "tags")

class Comments(Base):

    __tablename__ = "comment"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable = False)
    content = Column(String, nullable = False)
    created_at = Column(DateTime, default=datetime.utcnow)

    restaurant_id = Column(Integer, ForeignKey('restaurant.id'))
    user_id = Column(Integer, ForeignKey('user_account.id'))


    user = relationship("User", back_populates= "comments")
    restaurants = relationship("Restaurant", back_populates= "comments")
    tags = relationship("Tag", back_populates= "comments")


class Cosmetic(Base):

    __tablename__ = "cosmetic"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable= False)
    date_acquired = Column(DateTime, default=datetime.utcnow)
    user_id  = Column(Integer, ForeignKey('user_account.id'))

    user = relationship("User", back_populates = "cosmetics")

class Bookmark(Base):
    __tablename__ = "bookmark"   

    id = Column(Integer, primary_key=True, index=True)     
    name = Column(String, nullable= False)
    date_marked = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey('user_account.id'))
    restaurant_id = Column(Integer, ForeignKey('restaurant.id'))

    user = relationship("User", back_populates = "bookmarks")
    restaurants = relationship("Restaurant", back_populates= "bookmarks")