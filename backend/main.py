# Import FastAPI framework
from fastapi import FastAPI

# Import CORS middleware
from fastapi.middleware.cors import CORSMiddleware

# Import database connection test function
from database import test_connection

# Import auth routes
from routes.auth import router as auth_router

# Import rides routes
from routes.rides import router as rides_router

# Import ML routes
from routes.ml import router as ml_router

# Import dotenv
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Create FastAPI app
app = FastAPI(title="CarpoolPal API")

# Allow React frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Test database connection when server starts
@app.on_event("startup")
async def startup():
    test_connection()

# Include auth routes with /auth prefix
app.include_router(auth_router, prefix="/auth")

# Include rides routes with /rides prefix
app.include_router(rides_router, prefix="/rides")

# Include ML routes with /ml prefix
app.include_router(ml_router, prefix="/ml")

# Home route to check if server is running
@app.get("/")
def home():
    return {
        "message": "🚗 CarpoolPal Backend is running!",
        "status": "OK",
        "author": "Muskan Yadav",
        "github": "https://github.com/muskan-yadav18",
        "version": "1.0.0",
        "created": "2026",
        "signature": "Built with ❤️ by @muskan-yadav18"
    }