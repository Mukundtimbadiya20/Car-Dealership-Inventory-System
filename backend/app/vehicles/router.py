from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.dependencies import get_current_user, get_current_admin
from app.database import get_db
from app.vehicles.schemas import VehicleCreate, VehicleUpdate
from app.vehicles.service import (
    create_vehicle,
    get_all_vehicles,
    search_vehicles,
    update_vehicle,
    delete_vehicle,
)

router = APIRouter(
    prefix="/api/vehicles",
    tags=["Vehicles"]
)


@router.post("", status_code=201)
def add_vehicle(
    vehicle: VehicleCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return create_vehicle(db, vehicle)


@router.get("")
def list_vehicles(
    db: Session = Depends(get_db)
):
    return get_all_vehicles(db)


@router.get("/search")
def search_vehicle(
    keyword: str = Query(...),
    db: Session = Depends(get_db)
):
    return search_vehicles(db, keyword)


@router.put("/{vehicle_id}")
def edit_vehicle(
    vehicle_id: int,
    vehicle: VehicleUpdate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return update_vehicle(db, vehicle_id, vehicle)


@router.delete("/{vehicle_id}")
def remove_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    return delete_vehicle(db, vehicle_id)