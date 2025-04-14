from .user import router as user_router
from .restaurant import router as restaurant_router
from .comment import router as comment_router
from .tag import router as tag_router
from .bookmark import router as bookmark_router
from .cosmetic import router as cosmetic_router
from .address import router as address_router

__all__ = [
    "user_router",
    "restaurant_router",
    "comment_router",
    "tag_router",
    "bookmark_router",
    "cosmetic_router",
    "address_router",
]
