from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base


class Address(Base):

    __tablename__ = "address"

    id = Column(Integer, primary_key=True, index=True)
    street = Column(String(100), nullable = False)
    city = Column(String(50), nullable = False)
    state = Column(String(2), nullable = False)
    zip = Column(String(10), nullable = False)

    user_id = Column(Integer, ForeignKey("users.id"))

    # comment this out for the test to work
    user = relationship("User", back_populates = "addresses")