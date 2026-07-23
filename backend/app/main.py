from fastapi import FastAPI
from app.vehicles.router import router as vehicle_router
from app.database import Base, engine
from app.models import User, Vehicle
from app.auth.router import router as auth_router
from app.inventory.router import router as inventory_router

app = FastAPI(
    title="Car Dealership Inventory System",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(vehicle_router)
app.include_router(inventory_router)

@app.get("/")
def root():
    return {
        "message": "Car Dealership Inventory System API is running 🚗"
    }