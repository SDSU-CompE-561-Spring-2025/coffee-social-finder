from sqlalchemy.orm import Session
from typing import Optional
from app.models.restaurant_tag import Restaurant

def get_all_restaurants(db: Session):
    """
    Fetch all restaurants from the database.
    """
    return db.query(Restaurant).all()

def get_restaurant(db: Session, restaurant_id: int):
    return db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()

def create_restaurant(db: Session, address: str, name: str, 
                      rating: Optional[float] = None, phonenumber: Optional[str] = None, lat: float = None, lng: float = None):
    db_restaurant = Restaurant(
        address=address,
        name=name,
        rating=rating,
        phonenumber=phonenumber,
        lat=lat,
        lng=lng
    )
    db.add(db_restaurant)
    db.commit()
    db.refresh(db_restaurant)
    return db_restaurant

def update_restaurant(db: Session, restaurant_id: int, address: Optional[str] = None, 
                      name: Optional[str] = None, rating: Optional[float] = None, 
                      phonenumber: Optional[str] = None, lat: str = None, lng: str = None):
    db_restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    if not db_restaurant:
        return None
    if address is not None:
        db_restaurant.address = address
    if name is not None:
        db_restaurant.name = name
    if rating is not None:
        db_restaurant.rating = rating
    if phonenumber is not None:
        db_restaurant.phonenumber = phonenumber
    if lat is not None:
        db_restaurant.lat = lat
    if lng is not None:
        db_restaurant.lng = lng
    db.commit()
    db.refresh(db_restaurant)
    return db_restaurant

def delete_restaurant(db: Session, restaurant_id: int):
    db_restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    if not db_restaurant:
        return False
    db.delete(db_restaurant)
    db.commit()
    return True
