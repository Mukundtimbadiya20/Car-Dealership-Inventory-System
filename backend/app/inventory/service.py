from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.vehicle import Vehicle


def purchase_vehicle(db: Session, vehicle_id: int):
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()

    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    if vehicle.quantity <= 0:
        raise HTTPException(status_code=400, detail="Vehicle out of stock")

    vehicle.quantity -= 1

    db.commit()
    db.refresh(vehicle)

    return {
        "message": "Vehicle purchased successfully",
        "remaining_quantity": vehicle.quantity
    }


def restock_vehicle(db: Session, vehicle_id: int, quantity: int):
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()

    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    vehicle.quantity += quantity

    db.commit()
    db.refresh(vehicle)

    return {
        "message": "Vehicle restocked successfully",
        "quantity": vehicle.quantity
    }
    