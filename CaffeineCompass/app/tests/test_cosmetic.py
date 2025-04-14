import pytest
from datetime import datetime, timezone
from app.models.cosmetic import Cosmetic

# test will fail if relationship is not commented out
def test_cosmetic():
    now = datetime.now(timezone.utc)
    cosmetic = Cosmetic(id = 1, name = "Hair", date_acquired = now, user_id = 10)


    assert cosmetic.id == 1
    assert cosmetic.name == "Hair"
    assert cosmetic.date_acquired == now
    assert cosmetic.user_id == 10