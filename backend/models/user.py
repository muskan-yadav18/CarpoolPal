# Import pydantic for data validation
from pydantic import BaseModel, EmailStr

# Import Optional for optional fields
from typing import Optional

# User registration data structure
class UserRegister(BaseModel):
    name: str           # Full name of the user
    email: EmailStr     # Email address (auto validated)
    password: str       # Password
    phone: str          # Phone number

# User login data structure
class UserLogin(BaseModel):
    email: EmailStr     # Email address
    password: str       # Password

# User response data structure (sent back to frontend)
class UserResponse(BaseModel):
    id: str             # User ID from database
    name: str           # Full name
    email: str          # Email address
    phone: str          # Phone number
    