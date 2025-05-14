from app.models.user import User

def test_user():
    user = User(
        id=1,
        username="spiderman",
        email="spideman@avengers",
        hashed_password="spiderman",
        is_active=True
    )

    assert user.id == 1
    assert user.username == "spiderman"
    assert user.email == "spideman@avengers"
    assert user.hashed_password == "spiderman"
    assert user.is_active is True
