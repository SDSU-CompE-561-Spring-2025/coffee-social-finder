from fastapi import FastAPI, status, Depends, HTTPException
import models
from app.routes import auth,user, restaurant, comment, tag, bookmark, cosmetic, address
from sqlalchemy.orm import Session
from typing import Annotated


app = FastAPI()

models.Base.metadata.create_all(bind=models.engine)

def get_db():
    db = models.SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


@app.get("/", status_code=status.HTTP_200_OK)
async def user(user:None, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    return {"message": "Welcome to Caffeine Compass!"}

app.include_router(user.router)
app.include_router(restaurant.router)
app.include_router(comment.router)
app.include_router(tag.router)
app.include_router(bookmark.router)
app.include_router(cosmetic.router)
app.include_router(address.router)

# ... (whatever else)
