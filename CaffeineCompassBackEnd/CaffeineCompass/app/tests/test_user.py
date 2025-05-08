import pytest
from app.models.user import User

# test fails if relationships are not commented out
def test_user():
    user = User(
        id = 1,
        name = "Peter Parker",
        email = "spideman@avengers",
        password = "spiderman",
        created_at = "2023-10-01T00:00:00"
        )
        
    assert user.id == 1
    assert user.name == "Peter Parker"
    assert user.email == "spideman@avengers"
    assert user.password == "spiderman"
    assert user.created_at == "2023-10-01T00:00:00"
        
    