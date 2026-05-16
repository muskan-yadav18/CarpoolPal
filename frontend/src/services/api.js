// Import axios for making API calls
import axios from 'axios';

// Base URL of our FastAPI backend
const API_URL = 'http://127.0.0.1:8000';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ================================
// AUTH SERVICES
// ================================

// Signup function - creates new user
export const signup = async (userData) => {
  const response = await api.post('/auth/signup', userData);
  return response.data;
};

// Login function - logs in existing user
export const login = async (userData) => {
  const response = await api.post('/auth/login', userData);
  return response.data;
};

// ================================
// RIDES SERVICES
// ================================

// Get all available rides
export const getAllRides = async () => {
  const response = await api.get('/rides/all');
  return response.data;
};

// Create a new ride (needs token)
export const createRide = async (rideData, token) => {
  const response = await api.post('/rides/create', rideData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// ================================
// ML SERVICES
// ================================

// Predict price using ML model
export const predictPrice = async (data) => {
  const response = await api.post('/ml/predict-price', data);
  return response.data;
};