from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime
from app.models import User

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, name: str, email: str, password: str, 
                created_at: Optional[datetime] = None, 
                bookmark_id: Optional[int] = None,
                filtered_tags_id: Optional[int] = None,
                cosmetics_id: Optional[int] = None,
                comment_id: Optional[int] = None):
    if created_at is None:
        created_at = datetime.utcnow()
    db_user = User(
        name=name,
        email=email,
        password=password,
        created_at=created_at,
        bookmark_id=bookmark_id,
        filtered_tags_id=filtered_tags_id,
        cosmetics_id=cosmetics_id,
        comment_id=comment_id
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: int, name: Optional[str] = None, 
                email: Optional[str] = None):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        return None
    if name is not None:
        db_user.name = name
    if email is not None:
        db_user.email = email
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        return False
    db.delete(db_user)
    db.commit()
    return True
