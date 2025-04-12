from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.address import Address, AddressCreate, AddressUpdate
from app.crud.address import get_address, create_address, update_address, delete_address
from app.db.database import get_db

router = APIRouter(prefix="/addresses", tags=["addresses"])

@router.get("/{address_id}", response_model=Address)
def read_address(address_id: int, db: Session = Depends(get_db)):
    db_address = get_address(db, address_id)
    if not db_address:
        raise HTTPException(status_code=404, detail="Address not found")
    return db_address

@router.post("/", response_model=Address)
def create_new_address(address: AddressCreate, db: Session = Depends(get_db)):
    return create_address(
        db,
        street=address.street,
        city=address.city,
        state=address.state,
        zip_code=address.zip,
    )

@router.put("/{address_id}", response_model=Address)
def update_existing_address(address_id: int, address: AddressUpdate, db: Session = Depends(get_db)):
    db_address = get_address(db, address_id)
    if not db_address:
        raise HTTPException(status_code=404, detail="Address not found")
    return update_address(
        db,
        address_id=address_id,
        street=address.street,
        city=address.city,
        state=address.state,
        zip_code=address.zip,
    )

@router.delete("/{address_id}", response_model=dict)
def delete_existing_address(address_id: int, db: Session = Depends(get_db)):
    ok = delete_address(db, address_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Address not found")
    return {"detail": "Address deleted"}
