from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.comment import Comment, CommentCreate, CommentUpdate
from app.crud.comment import get_comment, create_comment, update_comment, delete_comment
from app.db.database import get_db

router = APIRouter(prefix="/comments", tags=["comments"])

@router.get("/{comment_id}", response_model=Comment)
def read_comment(comment_id: int, db: Session = Depends(get_db)):
    db_comment = get_comment(db, comment_id)
    if not db_comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return db_comment

@router.post("/", response_model=Comment)
def create_new_comment(comment: CommentCreate, db: Session = Depends(get_db)):
    return create_comment(
        db,
        title=comment.title,
        restaurant_id=comment.restaurant_id,
        tags_id=comment.tags_id,
        created_at=comment.created_at,
    )

@router.put("/{comment_id}", response_model=Comment)
def update_existing_comment(comment_id: int, comment: CommentUpdate, db: Session = Depends(get_db)):
    db_comment = get_comment(db, comment_id)
    if not db_comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return update_comment(
        db,
        comment_id=comment_id,
        title=comment.title,
        restaurant_id=comment.restaurant_id,
        tags_id=comment.tags_id,
    )

@router.delete("/{comment_id}", response_model=dict)
def delete_existing_comment(comment_id: int, db: Session = Depends(get_db)):
    ok = delete_comment(db, comment_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Comment not found")
    return {"detail": "Comment deleted"}
