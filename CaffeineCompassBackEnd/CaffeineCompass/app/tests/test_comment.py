import pytest
from app.models.comment import Comment
from datetime import datetime, timezone

def test_comment():
    now = datetime.now(timezone.utc)
    
    comment = Comment(
        id=1,
        content="Test comment",
        title="Test comment",
        created_at=now,
        restaurant_id=1,  
        user_id=1,        
        tag_id=1          
    )

    assert comment.id == 1
    assert comment.content == "Test comment"
    assert comment.title == "Test comment"
    assert comment.created_at == now
