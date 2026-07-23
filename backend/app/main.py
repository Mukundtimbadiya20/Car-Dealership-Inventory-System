from fastapi import FastAPI

from app.database import Base, engine
from app.models import User, Vehicle
from app.auth.router import router as auth_router

app = FastAPI(
    title="Car Dealership Inventory System",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)


@app.get("/")
def root():
    return {
        "message": "Car Dealership Inventory System API is running 🚗"
    }