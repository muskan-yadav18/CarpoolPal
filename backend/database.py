# Import MongoClient to connect to MongoDB
from pymongo import MongoClient

# Import os to read environment variables
import os

# Import dotenv to load .env file
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Read MongoDB URL from .env file
MONGODB_URL = os.getenv("MONGODB_URL")

# Create connection to MongoDB
client = MongoClient(MONGODB_URL)

# Select our database
db = client["carpoolpal"]

# Select collections (like tables in SQL)
users_collection = db["users"]        # Stores user data
rides_collection = db["rides"]        # Stores ride data
bookings_collection = db["bookings"]  # Stores booking data

# Test function to check database connection
def test_connection():
    try:
        client.admin.command("ping")
        print("✅ MongoDB connected successfully!")
        return True
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")
        return False

# Run test immediately when this file is imported
test_connection()