import pytest
from app.models.restaurant_tag import Restaurant

# test will fail if relationship is not commented out
def test_restaurant():
    restaurant = Restaurant(id = 1, address = "test", name= "John", rating = 5, phone_number = "6195945200")

    assert restaurant.id == 1
    assert restaurant.address == "test"
    assert restaurant.name == "John"
    assert restaurant.rating == 5
    assert restaurant.phone_number == "6195945200"

# test will fail if relationship is not commented out
def test_tag():
    tag = Restaurant(id = 1, name= "John")

    assert tag.id == 1
    assert tag.name == "John"