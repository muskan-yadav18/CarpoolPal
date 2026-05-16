# ============================================
# CarpoolPal - ML Route Optimizer
# Created by: Muskan Yadav
# GitHub: https://github.com/muskan-yadav18
# © 2026 Muskan Yadav. All rights reserved.
# ============================================v
# Import required libraries
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
import joblib
import os

# Get the directory where this file is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

class RouteOptimizer:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        self.is_trained = False

    def calculate_distance(self, lat1, lng1, lat2, lng2):
        # Calculate distance between two GPS points in km using Haversine formula
        R = 6371
        lat1, lng1, lat2, lng2 = map(np.radians, [lat1, lng1, lat2, lng2])
        dlat = lat2 - lat1
        dlng = lng2 - lng1
        a = np.sin(dlat/2)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlng/2)**2
        c = 2 * np.arcsin(np.sqrt(a))
        return R * c

    def generate_training_data(self):
        # Generate 1000 sample rides around Bhopal for training
        np.random.seed(42)
        n_samples = 1000

        pickup_lats = np.random.uniform(23.1, 23.4, n_samples)
        pickup_lngs = np.random.uniform(77.3, 77.6, n_samples)
        dropoff_lats = np.random.uniform(23.1, 23.4, n_samples)
        dropoff_lngs = np.random.uniform(77.3, 77.6, n_samples)

        distances = []
        for i in range(n_samples):
            d = self.calculate_distance(
                pickup_lats[i], pickup_lngs[i],
                dropoff_lats[i], dropoff_lngs[i]
            )
            distances.append(d)
        distances = np.array(distances)

        hours = np.random.randint(0, 24, n_samples)
        days = np.random.randint(0, 7, n_samples)
        seats = np.random.randint(1, 5, n_samples)

        # Price = distance x 10 rupees, peak hours = 1.5x
        base_price = distances * 10
        peak_multiplier = np.where(
            ((hours >= 8) & (hours <= 10)) | ((hours >= 17) & (hours <= 19)),
            1.5, 1.0
        )
        prices = base_price * peak_multiplier + np.random.normal(0, 5, n_samples)
        prices = np.maximum(prices, 20)

        X = np.column_stack([
            pickup_lats, pickup_lngs,
            dropoff_lats, dropoff_lngs,
            distances, hours, days, seats
        ])
        return X, prices

    def train(self):
        # Train the RandomForest model on sample data
        print("🤖 Training ML model...")
        X, y = self.generate_training_data()
        X_scaled = self.scaler.fit_transform(X)
        self.model.fit(X_scaled, y)
        self.is_trained = True

        # Save model in the same folder as this file
        model_path = os.path.join(BASE_DIR, "model.pkl")
        scaler_path = os.path.join(BASE_DIR, "scaler.pkl")
        joblib.dump(self.model, model_path)
        joblib.dump(self.scaler, scaler_path)
        print("✅ ML model trained and saved!")

    def load_model(self):
        # Load previously saved model if it exists
        model_path = os.path.join(BASE_DIR, "model.pkl")
        scaler_path = os.path.join(BASE_DIR, "scaler.pkl")
        if os.path.exists(model_path) and os.path.exists(scaler_path):
            self.model = joblib.load(model_path)
            self.scaler = joblib.load(scaler_path)
            self.is_trained = True
            print("✅ Saved model loaded!")
        else:
            self.train()

    def predict_price(self, pickup_lat, pickup_lng, dropoff_lat, dropoff_lng, hour, day, seats):
        # Predict ride price using trained ML model
        if not self.is_trained:
            self.load_model()

        distance = self.calculate_distance(pickup_lat, pickup_lng, dropoff_lat, dropoff_lng)

        features = np.array([[
            pickup_lat, pickup_lng,
            dropoff_lat, dropoff_lng,
            distance, hour, day, seats
        ]])

        features_scaled = self.scaler.transform(features)
        predicted_price = self.model.predict(features_scaled)[0]

        return {
            "predicted_price": round(float(predicted_price), 2),
            "distance_km": round(float(distance), 2),
            "price_per_km": round(float(predicted_price / distance), 2) if distance > 0 else 0
        }

# Create global optimizer instance
optimizer = RouteOptimizer()

if __name__ == "__main__":
    optimizer.train()