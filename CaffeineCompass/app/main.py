from fastapi import FastAPI, status, Depends, HTTPException, Request
from app.core.database import engine, Base, get_db
from app.routes import auth,user, restaurant, comment, tag, bookmark, cosmetic, address
from sqlalchemy.orm import Session
import time
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)
app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.perf_counter()
    response = await call_next(request)
    process_time = time.perf_counter() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

app.include_router(user.router)
app.include_router(auth.router)
app.include_router(restaurant.router)
app.include_router(comment.router)
app.include_router(tag.router)
app.include_router(bookmark.router)
app.include_router(cosmetic.router)
app.include_router(address.router)

@app.get("/", status_code=status.HTTP_200_OK)
async def user(token: str = Depends(auth.oauth2_scheme)):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    return {"message": "Welcome to Caffeine Compass!"}
