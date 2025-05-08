from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.bookmark_schema import Bookmark, BookmarkCreate, BookmarkUpdate
from app.crud.bookmark import get_bookmark, create_bookmark, update_bookmark, delete_bookmark
from app.core.database import get_db

router = APIRouter(prefix="/bookmarks", tags=["bookmarks"])

@router.get("/{bookmark_id}", response_model=Bookmark)
def read_bookmark(bookmark_id: int, db: Session = Depends(get_db)):
    db_bookmark = get_bookmark(db, bookmark_id)
    if not db_bookmark:
        raise HTTPException(status_code=404, detail="Bookmark not found")
    return db_bookmark

@router.post("/", response_model=Bookmark)
def create_new_bookmark(bookmark: BookmarkCreate, db: Session = Depends(get_db)):
    return create_bookmark(
        db,
        name=bookmark.name,
        date_bookmarked=bookmark.date_bookmarked,
        restaurant_name=bookmark.restaurant_name,
    )

@router.put("/{bookmark_id}", response_model=Bookmark)
def update_existing_bookmark(bookmark_id: int, bookmark: BookmarkUpdate, db: Session = Depends(get_db)):
    db_bookmark = get_bookmark(db, bookmark_id)
    if not db_bookmark:
        raise HTTPException(status_code=404, detail="Bookmark not found")
    return update_bookmark(
        db,
        bookmark_id=bookmark_id,
        name=bookmark.name,
        date_bookmarked=bookmark.date_bookmarked,
        restaurant_name=bookmark.restaurant_name,
    )

@router.delete("/{bookmark_id}", response_model=dict)
def delete_existing_bookmark(bookmark_id: int, db: Session = Depends(get_db)):
    ok = delete_bookmark(db, bookmark_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Bookmark not found")
    return {"detail": "Bookmark deleted"}
