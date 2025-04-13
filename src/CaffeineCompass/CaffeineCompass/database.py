from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
# ... (whatever else)

def get_db(): # api endpoints (routes) are created assuming this function exists, is named this, and that 'database.py' is kept in current location. be sure to change import location of every route if any part of this is altered
  #... (whatever else)


SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread":False}
)


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()