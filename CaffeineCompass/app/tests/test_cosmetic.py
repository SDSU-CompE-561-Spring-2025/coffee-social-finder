import pytest
from datetime import datetime
import cosmetic

def test_cosmetic():
    now = datetime.utcnow()
    cosmetic = Cosmetic(id = 1, name = "Hair", date_acquired=now,user_id = 10)


    assert cosmetic.id == 1
    assert cosmetic.id == "Hair"
    assert cosmetic.date_acquired == now
    assert cosmetic.user_id == 10