from sqlalchemy import create_engine
# ... (whatever else)

def get_db(): # api endpoints (routes) are created assuming this function exists and is named like this and also that database.py is kept in same location. be sure to change import location of every route if any part of this is altered
  #... (whatever else)
