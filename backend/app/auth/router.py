from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.auth.schemas import RegisterRequest
from app.auth.service import register_user
from app.database import get_db

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(
    user: RegisterRequest,
    db: Session = Depends(get_db)
):
    return register_user(db, user)