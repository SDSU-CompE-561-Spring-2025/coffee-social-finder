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
    username = Column(String, unique=True, nullable=False)

    address_id = Column(Integer, ForeignKey("address.id"), nullable=True)
    bookmark_id = Column(Integer, ForeignKey("bookmark.id"), nullable=True)
    filtered_tags_id = Column(Integer, ForeignKey("tag.id"), nullable=True)
    cosmetics_id = Column(Integer, ForeignKey("cosmetic.id"), nullable=True)
    comment_id = Column(Integer, ForeignKey("comment.id"), nullable=True)

    #   comment this out for the test to work   
    cosmetics = relationship("Cosmetic", back_populates="user", foreign_keys="[Cosmetic.user_id]")
    comments = relationship("Comment", back_populates = "user", foreign_keys="[Comment.user_id]")
    bookmarks = relationship("Bookmark", back_populates= "user", foreign_keys="[Bookmark.user_id]")
    address = relationship("Address", back_populates="user", uselist = False)