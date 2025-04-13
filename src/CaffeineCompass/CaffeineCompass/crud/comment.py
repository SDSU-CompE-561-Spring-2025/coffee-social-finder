from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime
from app.models import Comment

def get_comment(db: Session, comment_id: int):
    return db.query(Comment).filter(Comment.comment_id == comment_id).first()

def create_comment(db: Session, title: str, restaurant_id: int, tags_id: int, 
                   created_at: Optional[datetime] = None):
    if created_at is None:
        created_at = datetime.utcnow()
    db_comment = Comment(
        title=title,
        restaurant_id=restaurant_id,
        tags_id=tags_id,
        created_at=created_at
    )
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment

def update_comment(db: Session, comment_id: int, title: Optional[str] = None, 
                   restaurant_id: Optional[int] = None, tags_id: Optional[int] = None):
    db_comment = db.query(Comment).filter(Comment.comment_id == comment_id).first()
    if not db_comment:
        return None
    if title is not None:
        db_comment.title = title
    if restaurant_id is not None:
        db_comment.restaurant_id = restaurant_id
    if tags_id is not None:
        db_comment.tags_id = tags_id
    db.commit()
    db.refresh(db_comment)
    return db_comment

def delete_comment(db: Session, comment_id: int):
    db_comment = db.query(Comment).filter(Comment.comment_id == comment_id).first()
    if not db_comment:
        return False
    db.delete(db_comment)
    db.commit()
    return True
