from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import user, restaurant, comment, tag, bookmark, cosmetic, address
import logging
app = FastAPI()

# Cors middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def logging_middleware(request, call_next):
    response = await call_next(request)
    logging.info(f"Request: {request.method} {request.url} - Response: {response.status_code}")
    return response

app.include_router(user.router)
app.include_router(restaurant.router)
app.include_router(comment.router)
app.include_router(tag.router)
app.include_router(bookmark.router)
app.include_router(cosmetic.router)
app.include_router(address.router)

# ... (whatever else)
