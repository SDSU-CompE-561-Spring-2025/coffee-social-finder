from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.tag import Tag, TagCreate, TagUpdate
from app.crud.tag import get_tag, create_tag, update_tag, delete_tag
from app.database import get_db

router = APIRouter(prefix="/tags", tags=["tags"])

@router.get("/{tag_id}", response_model=Tag)
def read_tag(tag_id: int, db: Session = Depends(get_db)):
    db_tag = get_tag(db, tag_id)
    if not db_tag:
        raise HTTPException(status_code=404, detail="Tag not found")
    return db_tag

@router.post("/", response_model=Tag)
def create_new_tag(tag: TagCreate, db: Session = Depends(get_db)):
    return create_tag(db, name=tag.name)

@router.put("/{tag_id}", response_model=Tag)
def update_existing_tag(tag_id: int, tag: TagUpdate, db: Session = Depends(get_db)):
    db_tag = get_tag(db, tag_id)
    if not db_tag:
        raise HTTPException(status_code=404, detail="Tag not found")
    return update_tag(db, tag_id=tag_id, name=tag.name)

@router.delete("/{tag_id}", response_model=dict)
def delete_existing_tag(tag_id: int, db: Session = Depends(get_db)):
    ok = delete_tag(db, tag_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Tag not found")
    return {"detail": "Tag deleted"}
