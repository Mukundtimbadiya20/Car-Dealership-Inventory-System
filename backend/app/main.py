from fastapi import FastAPI

from app.database import Base, engine

# Import models so SQLAlchemy registers them
from app.models import User, Vehicle

app = FastAPI(
    title="Car Dealership Inventory System",
    version="1.0.0",
)

Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"message": "Car Dealership Inventory System API is running 🚗"}