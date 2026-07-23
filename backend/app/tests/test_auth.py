from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_register_user():
    response = client.post(
        "/api/auth/register",
        json={
            "username": "Mukund",
            "email": "mukund@gmail.com",
            "password": "password123"
        }
    )

    assert response.status_code == 201
    
def test_register_duplicate_email():
    payload = {
        "username": "Mukund",
        "email": "mukund@gmail.com",
        "password": "password123"
    }

    client.post("/api/auth/register", json=payload)

    response = client.post("/api/auth/register", json=payload)

    assert response.status_code == 400