# Import APIRouter and HTTPException
from fastapi import APIRouter, HTTPException, Header

# Import database collections
from database import rides_collection

# Import ride models
from models.ride import RideCreate

# Import JWT tools
from jose import jwt, JWTError

# Import os and dotenv
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Create router
router = APIRouter()

# Get JWT secret
JWT_SECRET = os.getenv("JWT_SECRET", "secret")

# Function to get current user from token
def get_current_user(token: str):
    try:
        # Decode the JWT token
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# CREATE RIDE ROUTE
@router.post("/create")
def create_ride(ride: RideCreate, authorization: str = Header(...)):
    try:
        # Get token from header
        token = authorization.replace("Bearer ", "")

        # Get current user from token
        current_user = get_current_user(token)

        # Create ride document
        new_ride = {
            "driver_id": current_user["id"],
            "pickup_location": ride.pickup_location,
            "dropoff_location": ride.dropoff_location,
            "pickup_lat": ride.pickup_lat,
            "pickup_lng": ride.pickup_lng,
            "dropoff_lat": ride.dropoff_lat,
            "dropoff_lng": ride.dropoff_lng,
            "available_seats": ride.available_seats,
            "price_per_seat": ride.price_per_seat,
            "departure_time": ride.departure_time,
            "status": "active"
        }

        # Save ride to database
        result = rides_collection.insert_one(new_ride)

        return {
            "message": "Ride created successfully!",
            "ride_id": str(result.inserted_id)
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        print(f"Create ride error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# GET ALL RIDES ROUTE
@router.get("/all")
def get_all_rides():
    try:
        # Get all active rides from database
        rides = list(rides_collection.find({"status": "active"}))

        # Convert MongoDB objects to JSON
        for ride in rides:
            ride["id"] = str(ride["_id"])
            del ride["_id"]

        return {"rides": rides}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))