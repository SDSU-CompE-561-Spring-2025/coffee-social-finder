import pytest
from app.models.restaurant_tag import Restaurant, Tag

def test_restaurant():
    restaurant = Restaurant(id = 1, address = "test", name= "John", rating = 5, phonenumber = "6195945200")

    assert restaurant.id == 1
    assert restaurant.address == "test"
    assert restaurant.name == "John"
    assert restaurant.rating == 5
    assert restaurant.phonenumber == "6195945200"

def test_tag():
    tag = Tag(id = 1, name= "John")

    assert tag.id == 1
    assert tag.name == "John"