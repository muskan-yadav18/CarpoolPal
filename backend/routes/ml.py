# Import APIRouter
from fastapi import APIRouter, HTTPException

# Import pydantic for data validation
from pydantic import BaseModel

# Import sys to access ml_model folder
import sys
import os

# Add ml_model folder to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', 'ml_model'))

# Import our ML model
from route_optimizer import optimizer

# Create router
router = APIRouter()

# Input data structure for price prediction
class PredictRequest(BaseModel):
    pickup_lat: float       # Pickup latitude
    pickup_lng: float       # Pickup longitude
    dropoff_lat: float      # Dropoff latitude
    dropoff_lng: float      # Dropoff longitude
    hour: int               # Hour of day (0-23)
    day: int                # Day of week (0-6)
    seats: int              # Number of seats

# Price prediction route
@router.post("/predict-price")
def predict_price(request: PredictRequest):
    try:
        # Get prediction from ML model
        result = optimizer.predict_price(
            request.pickup_lat,
            request.pickup_lng,
            request.dropoff_lat,
            request.dropoff_lng,
            request.hour,
            request.day,
            request.seats
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))