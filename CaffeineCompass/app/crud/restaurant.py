from sqlalchemy.orm import Session
from typing import Optional
from app.models import Restaurant

def get_restaurant(db: Session, restaurant_id: int):
    return db.query(Restaurant).filter(Restaurant.restaurant_id == restaurant_id).first()

def create_restaurant(db: Session, address: str, name: str, 
                      rating: Optional[float] = None, phonenumber: Optional[str] = None,
                      filtered_tags_id: Optional[int] = None, 
                      comment_id: Optional[int] = None):
    db_restaurant = Restaurant(
        address=address,
        name=name,
        rating=rating,
        phonenumber=phonenumber,
        filtered_tags_id=filtered_tags_id,
        comment_id=comment_id
    )
    db.add(db_restaurant)
    db.commit()
    db.refresh(db_restaurant)
    return db_restaurant

def update_restaurant(db: Session, restaurant_id: int, address: Optional[str] = None, 
                      name: Optional[str] = None, rating: Optional[float] = None, 
                      phonenumber: Optional[str] = None, filtered_tags_id: Optional[int] = None, 
                      comment_id: Optional[int] = None):
    db_restaurant = db.query(Restaurant).filter(Restaurant.restaurant_id == restaurant_id).first()
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
    if filtered_tags_id is not None:
        db_restaurant.filtered_tags_id = filtered_tags_id
    if comment_id is not None:
        db_restaurant.comment_id = comment_id
    db.commit()
    db.refresh(db_restaurant)
    return db_restaurant

def delete_restaurant(db: Session, restaurant_id: int):
    db_restaurant = db.query(Restaurant).filter(Restaurant.restaurant_id == restaurant_id).first()
    if not db_restaurant:
        return False
    db.delete(db_restaurant)
    db.commit()
    return True
