# ============================================
# CarpoolPal - Streamlit Demo App
# Created by: Muskan Yadav
# GitHub: https://github.com/muskan-yadav18
# ============================================

import streamlit as st
from route_optimizer import optimizer

# Page setup
st.set_page_config(page_title="CarpoolPal", page_icon="🚗", layout="wide")

# Title
st.title("🚗 CarpoolPal - AI Ride Sharing")
st.markdown("**Built by Muskan Yadav** | [GitHub](https://github.com/muskan-yadav18)")
st.divider()

# Create tabs for each feature
tab1, tab2, tab3, tab4 = st.tabs(["🤖 ML Price Predictor", "🌱 Carbon Tracker", "💰 Split Payment", "⭐ Trust Score"])

# ============================================
# TAB 1 - ML PRICE PREDICTOR
# ============================================
with tab1:
    st.header("🤖 ML Price Predictor")
    st.write("Enter ride details to get AI-predicted price")

    col1, col2 = st.columns(2)
    with col1:
        pickup_lat = st.number_input("Pickup Latitude", value=23.2599, format="%.4f")
        pickup_lng = st.number_input("Pickup Longitude", value=77.4126, format="%.4f")
        hour = st.slider("Hour of Day (0-23)", 0, 23, 9)
    with col2:
        dropoff_lat = st.number_input("Dropoff Latitude", value=23.3441, format="%.4f")
        dropoff_lng = st.number_input("Dropoff Longitude", value=77.4119, format="%.4f")
        seats = st.slider("Number of Seats", 1, 4, 2)

    day = st.selectbox("Day of Week", ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"])
    day_num = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].index(day)

    if st.button("🤖 Predict Price", type="primary"):
        result = optimizer.predict_price(pickup_lat, pickup_lng, dropoff_lat, dropoff_lng, hour, day_num, seats)
        c1, c2, c3 = st.columns(3)
        c1.metric("💰 Predicted Price", f"₹{result['predicted_price']}")
        c2.metric("📍 Distance", f"{result['distance_km']} km")
        c3.metric("📊 Price per km", f"₹{result['price_per_km']}")

# ============================================
# TAB 2 - CARBON FOOTPRINT TRACKER
# ============================================
with tab2:
    st.header("🌱 Carbon Footprint Tracker")
    st.write("See how much CO2 you save by carpooling!")

    distance = st.number_input("Distance (km)", value=9.36, min_value=0.1)
    passengers = st.slider("Number of Passengers", 1, 4, 3)

    if st.button("🌱 Calculate CO2 Saved", type="primary"):
        solo = distance * 0.21
        shared = solo / passengers
        saved = solo - shared
        trees = saved / 21

        c1, c2 = st.columns(2)
        c1.metric("🌍 Solo Emission", f"{round(solo,3)} kg CO2")
        c2.metric("🚗 Shared Emission", f"{round(shared,3)} kg CO2")
        c1.metric("✅ CO2 Saved", f"{round(saved,3)} kg")
        c2.metric("🌳 Trees Equivalent", f"{round(trees,4)} trees")
        st.success(f"🌱 You saved {round(saved,3)} kg of CO2!")

# ============================================
# TAB 3 - SPLIT PAYMENT CALCULATOR
# ============================================
with tab3:
    st.header("💰 Split Payment Calculator")
    st.write("Calculate how much each person pays!")

    total_price = st.number_input("Total Ride Price (₹)", value=115.0, min_value=1.0)
    passengers2 = st.slider("Number of Passengers", 1, 4, 3, key="split_pass")

    if st.button("💰 Calculate Split", type="primary"):
        per_person = total_price / passengers2
        platform_fee = per_person * 0.05
        final = per_person + platform_fee

        c1, c2, c3 = st.columns(3)
        c1.metric("💵 Per Person", f"₹{round(per_person,2)}")
        c2.metric("📊 Platform Fee", f"₹{round(platform_fee,2)}")
        c3.metric("💰 Final Amount", f"₹{round(final,2)}")
        st.success(f"💰 Each person pays ₹{round(final,2)}")

# ============================================
# TAB 4 - TRUST SCORE SYSTEM
# ============================================
with tab4:
    st.header("⭐ Trust Score System")
    st.write("Calculate trust level as a driver/passenger!")

    rating = st.slider("Rating (1-5)", 1.0, 5.0, 4.5, 0.1)
    total_rides = st.number_input("Total Rides Completed", value=25, min_value=0)
    cancellations = st.number_input("Number of Cancellations", value=2, min_value=0)
    punctuality = st.slider("Punctuality Score (0-100)", 0, 100, 85)

    if st.button("⭐ Calculate Trust Score", type="primary"):
        rating_score = (rating / 5) * 40
        exp_score = min(total_rides / 50, 1) * 20
        c_rate = cancellations / max(total_rides, 1)
        c_score = (1 - c_rate) * 20
        p_score = (punctuality / 100) * 20
        total = rating_score + exp_score + c_score + p_score

        if total >= 80: level = "⭐ Platinum"
        elif total >= 60: level = "🥇 Gold"
        elif total >= 40: level = "🥈 Silver"
        else: level = "🥉 Bronze"

        c1, c2 = st.columns(2)
        c1.metric("⭐ Trust Score", f"{round(total,2)}/100")
        c2.metric("🏆 Trust Level", level)
        st.success(f"Your trust level is {level}")

# Footer
st.divider()
st.markdown("🚗 **CarpoolPal** | Built with ❤️ by [@muskan-yadav18](https://github.com/muskan-yadav18) | © 2026 Muskan Yadav. All rights reserved.")