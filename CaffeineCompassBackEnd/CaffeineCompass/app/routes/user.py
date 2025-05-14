from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.crud.user import get_user, get_users, create_user, update_user, delete_user
from app.schemas.user_schema import UserBase, UserCreate, UserUpdate, UserOut
from app.core.database import get_db

router = APIRouter()

@router.get("/", response_model=list[UserOut])
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_users(db, skip=skip, limit=limit)

@router.get("/{user_id}", response_model=UserOut)
def read_user(user_id: int, db: Session = Depends(get_db)):
    return get_user(db, user_id)

@router.post("/", response_model=UserOut)
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(
        db=db,
        username=user.username,
        email=user.email,
        password=user.password
    )

@router.put("/{user_id}", response_model=UserOut)
def update_existing_user(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)):
    return update_user(db, user_id, user_update)

@router.delete("/{user_id}")
def delete_existing_user(user_id: int, db: Session = Depends(get_db)):
    return delete_user(db, user_id)