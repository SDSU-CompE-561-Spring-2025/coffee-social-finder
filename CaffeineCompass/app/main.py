from fastapi import FastAPI
from app.api import user, restaurant, comment, tag, bookmark, cosmetic, address

app = FastAPI()

app.include_router(user.router)
app.include_router(restaurant.router)
app.include_router(comment.router)
app.include_router(tag.router)
app.include_router(bookmark.router)
app.include_router(cosmetic.router)
app.include_router(address.router)

# ...
