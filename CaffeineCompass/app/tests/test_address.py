import pytest
from app.models.address import Address

# test will fail if relationship is not commented out
def test_address():
    address = Address(
        id = 1,
        street = "123 Main St",
        city = "San Diego",
        state = "CA",
        zip = "92114"
    )
    assert address.id == 1
    assert address.street == "123 Main St"
    assert address.city == "San Diego"
    assert address.state == "CA"
    assert address.zip == "92114"
