from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.vehicle import Vehicle
from app.vehicles.schemas import VehicleCreate, VehicleUpdate


def create_vehicle(db: Session, vehicle: VehicleCreate):
    new_vehicle = Vehicle(
        make=vehicle.make,
        model=vehicle.model,
        category=vehicle.category,
        price=vehicle.price,
        quantity=vehicle.quantity,
    )

    db.add(new_vehicle)
    db.commit()
    db.refresh(new_vehicle)

    return new_vehicle


def get_all_vehicles(db: Session):
    return db.query(Vehicle).all()


def search_vehicles(db: Session, keyword: str):
    return (
        db.query(Vehicle)
        .filter(
            (Vehicle.make.contains(keyword)) |
            (Vehicle.model.contains(keyword)) |
            (Vehicle.category.contains(keyword))
        )
        .all()
    )


def update_vehicle(db: Session, vehicle_id: int, data: VehicleUpdate):

    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()

    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    vehicle.make = data.make
    vehicle.model = data.model
    vehicle.category = data.category
    vehicle.price = data.price
    vehicle.quantity = data.quantity

    db.commit()
    db.refresh(vehicle)

    return vehicle


def delete_vehicle(db: Session, vehicle_id: int):

    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()

    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    db.delete(vehicle)
    db.commit()

    return {"message": "Vehicle deleted successfully"}