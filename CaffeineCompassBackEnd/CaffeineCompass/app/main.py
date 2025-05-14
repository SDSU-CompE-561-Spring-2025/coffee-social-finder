from fastapi import FastAPI, status, Depends, HTTPException, Request
from app.core.database import engine, Base
from app.routes import user, restaurant, comment, tag, address
from sqlalchemy.orm import Session
import time
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer
from app.core.auth import router as auth_router

Base.metadata.create_all(bind=engine)
app = FastAPI()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "https://CaffeineCompass.com",
    "https://www.CaffeineCompass.com",
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

app.include_router(user.router, prefix="/users")
app.include_router(auth_router, prefix="/auth")
app.include_router(restaurant.router, prefix="/restaurants")
app.include_router(comment.router, prefix="/comments")
app.include_router(tag.router, prefix="/tags")
app.include_router(address.router, prefix="/addresses")