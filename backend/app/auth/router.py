from fastapi import APIRouter, status

from app.auth.schemas import RegisterRequest
from app.auth.service import register_user

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: RegisterRequest):
    return register_user(user)