from fastapi import FastAPI
from app.vehicles.router import router as vehicle_router
from app.database import Base, engine
from app.models import User, Vehicle
from app.auth.router import router as auth_router
from app.inventory.router import router as inventory_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Car Dealership Inventory System",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(vehicle_router)
app.include_router(inventory_router)

