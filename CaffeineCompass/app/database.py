from sqlalchemy import create_engine
# ... (whatever else)

def get_db(): # api endpoints (routes) are created assuming this function exists, is named this, and that 'database.py' is kept in current location. be sure to change import location of every route if any part of this is altered
  #... (whatever else)
