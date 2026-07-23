from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.dependencies import get_current_admin
from app.database import get_db
from app.inventory.service import purchase_vehicle, restock_vehicle

router = APIRouter(
    prefix="/api/vehicles",
    tags=["Inventory"]
)


@router.post("/{vehicle_id}/purchase")
def purchase(
    vehicle_id: int,
    db: Session = Depends(get_db)
):
    return purchase_vehicle(db, vehicle_id)


@router.post("/{vehicle_id}/restock")
def restock(
    vehicle_id: int,
    quantity: int = Query(...),
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    return restock_vehicle(db, vehicle_id, quantity)