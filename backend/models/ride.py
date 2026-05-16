# Import pydantic for data validation
from pydantic import BaseModel

# Import Optional for optional fields
from typing import Optional

# Ride creation data structure
class RideCreate(BaseModel):
    pickup_location: str        # Where the ride starts
    dropoff_location: str       # Where the ride ends
    pickup_lat: float           # Pickup latitude (GPS)
    pickup_lng: float           # Pickup longitude (GPS)
    dropoff_lat: float          # Dropoff latitude (GPS)
    dropoff_lng: float          # Dropoff longitude (GPS)
    available_seats: int        # Number of seats available
    price_per_seat: float       # Price per seat in rupees
    departure_time: str         # When the ride departs

# Ride response data structure
class RideResponse(BaseModel):
    id: str                     # Ride ID from database
    driver_id: str              # Driver's user ID
    pickup_location: str        # Pickup location name
    dropoff_location: str       # Dropoff location name
    available_seats: int        # Available seats
    price_per_seat: float       # Price per seat
    departure_time: str         # Departure time
    status: str                 # Ride status (active/completed)