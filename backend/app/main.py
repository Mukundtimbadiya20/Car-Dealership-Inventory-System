from fastapi import FastAPI

app = FastAPI(
    title="Car Dealership Inventory System",
    version="1.0.0"
)

@app.get("/")
def root():
    return {
        "message": "Car Dealership Inventory System API is running 🚗"
    }