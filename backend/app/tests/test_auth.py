from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_register_user():
    response = client.post(
        "/api/auth/register",
        json={
            "username": "Mukund",
            "email": "register@test.com",
            "password": "password123"
        }
    )

    assert response.status_code == 201
    
def test_register_duplicate_email():
    payload = {
        "username": "Mukund",
        "email": "duplicate@test.com",
        "password": "password123"
    }

    client.post("/api/auth/register", json=payload)
    response = client.post("/api/auth/register", json=payload)

    assert response.status_code == 400
def test_login_success():
    register_payload = {
        "username": "Mukund",
        "email": "login@test.com",
        "password": "password123"
    }

    client.post("/api/auth/register", json=register_payload)

    response = client.post(
        "/api/auth/login",
        json={
            "email": "login@test.com",
            "password": "password123"
        }
    )

    assert response.status_code == 200

def test_login_invalid_password():
    response = client.post(
        "/api/auth/login",
        json={
            "email": "mukund@gmail.com",
            "password": "wrongpassword"
        }
    )

    assert response.status_code == 401