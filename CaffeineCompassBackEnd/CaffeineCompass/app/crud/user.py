from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime
from app.models.user import User
from fastapi import HTTPException, status
from app.core.security import get_password_hash
from sqlalchemy.exc import IntegrityError


def get_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found",
        )
    return user

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, name: str, email: str, password: str):
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise ValueError("A user with this email already exists.")

    db_user = User(
        username=name,
        email=email,
        hashed_password=get_password_hash(password)
    )

    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except IntegrityError as e:
        db.rollback()
        raise ValueError("Could not create user: Email must be unique.") from e



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

def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(User).offset(skip).limit(limit).all()
