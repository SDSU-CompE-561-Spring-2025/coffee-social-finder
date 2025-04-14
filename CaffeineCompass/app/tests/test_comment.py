import pytest
from app.models.comment import Comment
from datetime import datetime, timezone


# test will fail if relationship is not commented out
def test_comment():
    now = datetime.now(timezone.utc)
    comment = Comment(id = 1, content = "Test comment", title = "Test comment",   created_at = now) 

    assert comment.id == 1
    assert comment.content == "Test comment"
    assert comment.title == "Test comment"
    assert comment.created_at == now