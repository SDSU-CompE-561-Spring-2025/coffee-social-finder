from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user_schema import User, UserCreate, UserUpdate
from app.crud.user import get_user, get_user_by_email, create_user, update_user, delete_user
from app.core.database import get_db

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/{user_id}", response_model=User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.post("/", response_model=User)
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user(
        db,
        name=user.name,
        email=user.email,
        password=user.password,
        created_at=user.created_at,
        bookmark_id=user.bookmark_id,
        filtered_tags_id=user.filtered_tags_id,
        cosmetics_id=user.cosmetics_id,
        comment_id=user.comment_id,
    )

@router.put("/{user_id}", response_model=User)
def update_existing_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    db_user = get_user(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    # Adjust the update call as needed if your CRUD update handles all fields.
    return update_user(
        db,
        user_id=user_id,
        name=user.name,
        email=user.email,
        password=user.password,
        created_at=user.created_at,
        bookmark_id=user.bookmark_id,
        filtered_tags_id=user.filtered_tags_id,
        cosmetics_id=user.cosmetics_id,
        comment_id=user.comment_id,
    )

@router.delete("/{user_id}", response_model=dict)
def delete_existing_user(user_id: int, db: Session = Depends(get_db)):
    ok = delete_user(db, user_id)
    if not ok:
        raise HTTPException(status_code=404, detail="User not found")
    return {"detail": "User deleted"}
