# Import APIRouter to create routes
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse

# Import database collections
from database import users_collection

# Import user models
from models.user import UserRegister, UserLogin

# Import password hashing tools
from passlib.context import CryptContext

# Import JWT token tools
from jose import jwt

# Import os and dotenv
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Create router
router = APIRouter()

# Setup password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Get JWT secret
JWT_SECRET = os.getenv("JWT_SECRET", "secret")

# Hash password
def hash_password(password: str):
    # Truncate password to 72 bytes for bcrypt compatibility
    return pwd_context.hash(password[:72])

# Verify password
def verify_password(plain_password: str, hashed_password: str):
    # Truncate password to 72 bytes for bcrypt compatibility
    return pwd_context.verify(plain_password[:72], hashed_password)

# Create JWT token
def create_token(data: dict):
    return jwt.encode(data, JWT_SECRET, algorithm="HS256")

# SIGNUP ROUTE
@router.post("/signup")
def signup(user: UserRegister):
    try:
        # Check if email already exists
        existing_user = users_collection.find_one({"email": user.email})
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        # Hash password
        hashed_password = hash_password(user.password)

        # Create new user
        new_user = {
            "name": user.name,
            "email": user.email,
            "password": hashed_password,
            "phone": user.phone
        }

        # Save to database
        result = users_collection.insert_one(new_user)

        # Create token
        token = create_token({"id": str(result.inserted_id), "email": user.email})

        return JSONResponse(content={
            "message": "User registered successfully!",
            "token": token
        })
    except HTTPException as he:
        raise he
    except Exception as e:
        print(f"Signup error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# LOGIN ROUTE
@router.post("/login")
def login(user: UserLogin):
    try:
        # Find user by email
        db_user = users_collection.find_one({"email": user.email})
        if not db_user:
            raise HTTPException(status_code=400, detail="Email not found")

        # Verify password
        if not verify_password(user.password, db_user["password"]):
            raise HTTPException(status_code=400, detail="Incorrect password")

        # Create token
        token = create_token({"id": str(db_user["_id"]), "email": user.email})

        return JSONResponse(content={
            "message": "Login successful!",
            "token": token
        })
    except HTTPException as he:
        raise he
    except Exception as e:
        print(f"Login error: {e}")
        raise HTTPException(status_code=500, detail=str(e))