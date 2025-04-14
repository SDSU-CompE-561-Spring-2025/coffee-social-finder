import pytest
from app.models.restaurant_tag import Restaurant

def test_restaurant():
    pn = Restaurant(id = 1, address = "test", name= "John", rating = 5, phone_number = "6195945200")

    assert pn.id == 1
    assert pn.address == "test"
    assert pn.name == "John"
    assert pn.rating == 5
    assert pn.phone_number == "6195945200"

def test_tag():
    pn = Restaurant(id = 1, name= "John")

    assert pn.id == 1
    assert pn.name == "John"