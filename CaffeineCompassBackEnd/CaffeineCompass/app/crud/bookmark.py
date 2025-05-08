from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime
from app.models.bookmark import Bookmark

def get_bookmark(db: Session, bookmark_id: int):
    return db.query(Bookmark).filter(Bookmark.bookmark_id == bookmark_id).first()

def create_bookmark(db: Session, name: str, date_bookmarked: Optional[datetime] = None, restaurant_name: str = ""):
    if date_bookmarked is None:
        date_bookmarked = datetime.utcnow()
    db_bookmark = Bookmark(
        name=name,
        date_bookmarked=date_bookmarked,
        restaurant_name=restaurant_name
    )
    db.add(db_bookmark)
    db.commit()
    db.refresh(db_bookmark)
    return db_bookmark

def update_bookmark(db: Session, bookmark_id: int, name: Optional[str] = None,
                    date_bookmarked: Optional[datetime] = None, restaurant_name: Optional[str] = None):
    db_bookmark = db.query(Bookmark).filter(Bookmark.bookmark_id == bookmark_id).first()
    if not db_bookmark:
        return None
    if name is not None:
        db_bookmark.name = name
    if date_bookmarked is not None:
        db_bookmark.date_bookmarked = date_bookmarked
    if restaurant_name is not None:
        db_bookmark.restaurant_name = restaurant_name
    db.commit()
    db.refresh(db_bookmark)
    return db_bookmark

def delete_bookmark(db: Session, bookmark_id: int):
    db_bookmark = db.query(Bookmark).filter(Bookmark.bookmark_id == bookmark_id).first()
    if not db_bookmark:
        return False
    db.delete(db_bookmark)
    db.commit()
    return True
