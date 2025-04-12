from sqlalchemy.orm import Session
from typing import Optional
from app.models import Address

def get_address(db: Session, address_id: int):
    return db.query(Address).filter(Address.address_id == address_id).first()

def create_address(db: Session, street: str, city: str, state: str, zip_code: str):
    db_address = Address(
        street=street,
        city=city,
        state=state,
        zip=zip_code
    )
    db.add(db_address)
    db.commit()
    db.refresh(db_address)
    return db_address

def update_address(db: Session, address_id: int, street: Optional[str] = None, 
                   city: Optional[str] = None, state: Optional[str] = None,
                   zip_code: Optional[str] = None):
    db_address = db.query(Address).filter(Address.address_id == address_id).first()
    if not db_address:
        return None
    if street is not None:
        db_address.street = street
    if city is not None:
        db_address.city = city
    if state is not None:
        db_address.state = state
    if zip_code is not None:
        db_address.zip = zip_code
    db.commit()
    db.refresh(db_address)
    return db_address

def delete_address(db: Session, address_id: int):
    db_address = db.query(Address).filter(Address.address_id == address_id).first()
    if not db_address:
        return False
    db.delete(db_address)
    db.commit()
    return True
