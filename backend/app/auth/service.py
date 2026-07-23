from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.auth.schemas import LoginRequest
from app.auth.security import verify_password, create_access_token
from app.auth.schemas import RegisterRequest
from app.auth.security import hash_password
from app.models.user import User


def register_user(
    db: Session,
    user: RegisterRequest
):

    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = User(
        username=user.username,
        email=user.email,
        password_hash=hash_password(user.password)
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }
def login_user(db: Session, user: LoginRequest):
    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(user.password, existing_user.password_hash):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {
            "sub": existing_user.email,
            "is_admin": existing_user.is_admin
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }