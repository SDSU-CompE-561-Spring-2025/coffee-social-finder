from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.restaurant_schema import Restaurant, RestaurantCreate, RestaurantUpdate
from app.crud.restaurant import get_restaurant, create_restaurant, update_restaurant, delete_restaurant
from app.core.database import get_db

router = APIRouter(prefix="/restaurants", tags=["restaurants"])

@router.get("/{restaurant_id}", response_model=Restaurant)
def read_restaurant(restaurant_id: int, db: Session = Depends(get_db)):
    db_restaurant = get_restaurant(db, restaurant_id)
    if not db_restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return db_restaurant

@router.post("/", response_model=Restaurant)
def create_new_restaurant(restaurant: RestaurantCreate, db: Session = Depends(get_db)):
    return create_restaurant(
        db,
        address=restaurant.address,
        name=restaurant.name,
        rating=restaurant.rating,
        phonenumber=restaurant.phonenumber,
        filtered_tags_id=restaurant.filtered_tags_id,
        comment_id=restaurant.comment_id,
    )

@router.put("/{restaurant_id}", response_model=Restaurant)
def update_existing_restaurant(restaurant_id: int, restaurant: RestaurantUpdate, db: Session = Depends(get_db)):
    db_restaurant = get_restaurant(db, restaurant_id)
    if not db_restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return update_restaurant(
        db,
        restaurant_id=restaurant_id,
        address=restaurant.address,
        name=restaurant.name,
        rating=restaurant.rating,
        phonenumber=restaurant.phonenumber,
        filtered_tags_id=restaurant.filtered_tags_id,
        comment_id=restaurant.comment_id,
    )

@router.delete("/{restaurant_id}", response_model=dict)
def delete_existing_restaurant(restaurant_id: int, db: Session = Depends(get_db)):
    ok = delete_restaurant(db, restaurant_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return {"detail": "Restaurant deleted"}
