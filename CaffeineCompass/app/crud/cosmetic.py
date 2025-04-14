from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime
from app.models.cosmetic import Cosmetic

def get_cosmetic(db: Session, cosmetic_id: int):
    return db.query(Cosmetic).filter(Cosmetic.id == cosmetic_id).first()

def create_cosmetic(db: Session, name: str, date_acquired: Optional[datetime] = None):
    if date_acquired is None:
        date_acquired = datetime.utcnow()
    db_cosmetic = Cosmetic(
        name=name,
        date_acquired=date_acquired
    )
    db.add(db_cosmetic)
    db.commit()
    db.refresh(db_cosmetic)
    return db_cosmetic

def update_cosmetic(db: Session, cosmetic_id: int, name: Optional[str] = None, 
                    date_acquired: Optional[datetime] = None):
    db_cosmetic = db.query(Cosmetic).filter(Cosmetic.id == cosmetic_id).first()
    if not db_cosmetic:
        return None
    if name is not None:
        db_cosmetic.name = name
    if date_acquired is not None:
        db_cosmetic.date_acquired = date_acquired
    db.commit()
    db.refresh(db_cosmetic)
    return db_cosmetic

def delete_cosmetic(db: Session, cosmetic_id: int):
    db_cosmetic = db.query(Cosmetic).filter(Cosmetic.id == cosmetic_id).first()
    if not db_cosmetic:
        return False
    db.delete(db_cosmetic)
    db.commit()
    return True
