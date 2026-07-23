from pydantic import BaseModel


class VehicleCreate(BaseModel):
    make: str
    model: str
    category: str
    price: float
    quantity: int


class VehicleUpdate(BaseModel):
    make: str
    model: str
    category: str
    price: float
    quantity: int


class VehicleResponse(BaseModel):
    id: int
    make: str
    model: str
    category: str
    price: float
    quantity: int

    class Config:
        from_attributes = True