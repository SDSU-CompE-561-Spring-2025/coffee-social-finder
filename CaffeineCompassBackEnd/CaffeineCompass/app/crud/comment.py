from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime
from app.models.comment import Comment
from app.schemas.comment_schema import CommentCreate, CommentUpdate

def get_comment(db: Session, comment_id: int):
    return db.query(Comment).filter(Comment.id == comment_id).first()

def create_comment(db: Session, comment: CommentCreate):
    db_comment = Comment(
        title=comment.title,
        content=comment.content,
        restaurant_id=comment.restaurant_id,
        user_id=comment.user_id,
        tag_id=comment.tag_id,
        created_at=comment.created_at or datetime.utcnow()
    )
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment

def update_comment(db: Session, comment_id: int, title: Optional[str] = None,
    content: Optional[str] = None, restaurant_id: Optional[int] = None,
    tag_id: Optional[int] = None
):
    db_comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not db_comment:
        return None

    if title is not None:
        db_comment.title = title
    if content is not None:
        db_comment.content = content
    if restaurant_id is not None:
        db_comment.restaurant_id = restaurant_id
    if tag_id is not None:
        db_comment.tag_id = tag_id

    db.commit()
    db.refresh(db_comment)
    return db_comment


def delete_comment(db: Session, comment_id: int):
    db_comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not db_comment:
        return False
    db.delete(db_comment)
    db.commit()
    return True
