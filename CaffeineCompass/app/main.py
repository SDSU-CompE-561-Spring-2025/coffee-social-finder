from fastapi import FastAPI, status, Depends, HTTPException
from app.core.database import engine, Base, get_db
from app.routes import auth,user, restaurant, comment, tag, bookmark, cosmetic, address
from sqlalchemy.orm import Session

Base.metadata.create_all(bind=engine)
app = FastAPI()
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(restaurant.router)
app.include_router(comment.router)
app.include_router(tag.router)
app.include_router(bookmark.router)
app.include_router(cosmetic.router)
app.include_router(address.router)

# ... (whatever else)

@app.get("/", status_code=status.HTTP_200_OK)
async def user(token: str = Depends(auth.oauth2_scheme)):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    return {"message": "Welcome to Caffeine Compass!"}
