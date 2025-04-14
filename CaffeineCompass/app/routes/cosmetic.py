from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.cosmetic import Cosmetic, CosmeticCreate, CosmeticUpdate
from app.crud.cosmetic import get_cosmetic, create_cosmetic, update_cosmetic, delete_cosmetic
from app.database import get_db

router = APIRouter(prefix="/cosmetics", tags=["cosmetics"])

@router.get("/{cosmetic_id}", response_model=Cosmetic)
def read_cosmetic(cosmetic_id: int, db: Session = Depends(get_db)):
    db_cosmetic = get_cosmetic(db, cosmetic_id)
    if not db_cosmetic:
        raise HTTPException(status_code=404, detail="Cosmetic not found")
    return db_cosmetic

@router.post("/", response_model=Cosmetic)
def create_new_cosmetic(cosmetic: CosmeticCreate, db: Session = Depends(get_db)):
    return create_cosmetic(db, name=cosmetic.name, date_acquired=cosmetic.date_acquired)

@router.put("/{cosmetic_id}", response_model=Cosmetic)
def update_existing_cosmetic(cosmetic_id: int, cosmetic: CosmeticUpdate, db: Session = Depends(get_db)):
    db_cosmetic = get_cosmetic(db, cosmetic_id)
    if not db_cosmetic:
        raise HTTPException(status_code=404, detail="Cosmetic not found")
    return update_cosmetic(db, cosmetic_id=cosmetic_id, name=cosmetic.name, date_acquired=cosmetic.date_acquired)

@router.delete("/{cosmetic_id}", response_model=dict)
def delete_existing_cosmetic(cosmetic_id: int, db: Session = Depends(get_db)):
    ok = delete_cosmetic(db, cosmetic_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Cosmetic not found")
    return {"detail": "Cosmetic deleted"}
