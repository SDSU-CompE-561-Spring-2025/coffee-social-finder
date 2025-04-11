from sqlalchemy.orm import Session
from models import Comments
from comment_schema import Create_Comment

def create_comment(db: Session, comment: Create_Comment):
    db_user = Comments(**comment.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user