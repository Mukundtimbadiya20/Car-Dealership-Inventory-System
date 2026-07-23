from app.auth.schemas import RegisterRequest


def register_user(user: RegisterRequest):
    return {
        "message": "User registered successfully"
    }