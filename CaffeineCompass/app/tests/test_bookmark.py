import pytest
from app.models.bookmark import Bookmark

# test fails if relationships are not commented out
def test_bookmark():
    bookmark = Bookmark(
        id=1,
        name="Test Bookmark",
        date_marked="2023-10-01T00:00:00",
        user_id=1,
        restaurant_id=1
    )
    assert bookmark.id == 1
    assert bookmark.name == "Test Bookmark"
    assert bookmark.date_marked == "2023-10-01T00:00:00"
    assert bookmark.user_id == 1
    assert bookmark.restaurant_id == 1