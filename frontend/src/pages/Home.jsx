import { useState, useEffect } from 'react';
import { getAllRides, predictPrice } from '../services/api';
import Footer from '../components/Footer';

function Home() {
  const [rides, setRides] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predForm, setPredForm] = useState({
    pickup_lat: 23.2599,
    pickup_lng: 77.4126,
    dropoff_lat: 23.3441,
    dropoff_lng: 77.4119,
    hour: 9,
    day: 1,
    seats: 2
  });

  useEffect(() => { fetchRides(); }, []);

  const fetchRides = async () => {
    try {
      const data = await getAllRides();
      setRides(data.rides);
    } catch (err) {
      console.error('Error fetching rides:', err);
    }
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const result = await predictPrice(predForm);
      setPrediction(result);
    } catch (err) {
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h1 style={styles.navTitle}>🚗 CarpoolPal</h1>
        <div>
          <a href="/create-ride" style={styles.navLink}>Create Ride</a>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.card}>
          <h2>💰 ML Price Predictor</h2>
          <p style={styles.cardDesc}>Enter ride details to get AI-predicted price</p>
          <div style={styles.grid}>
            <input style={styles.input} type="number" placeholder="Pickup Latitude" value={predForm.pickup_lat} onChange={(e) => setPredForm({...predForm, pickup_lat: parseFloat(e.target.value)})} />
            <input style={styles.input} type="number" placeholder="Pickup Longitude" value={predForm.pickup_lng} onChange={(e) => setPredForm({...predForm, pickup_lng: parseFloat(e.target.value)})} />
            <input style={styles.input} type="number" placeholder="Dropoff Latitude" value={predForm.dropoff_lat} onChange={(e) => setPredForm({...predForm, dropoff_lat: parseFloat(e.target.value)})} />
            <input style={styles.input} type="number" placeholder="Dropoff Longitude" value={predForm.dropoff_lng} onChange={(e) => setPredForm({...predForm, dropoff_lng: parseFloat(e.target.value)})} />
            <input style={styles.input} type="number" placeholder="Hour (0-23)" value={predForm.hour} onChange={(e) => setPredForm({...predForm, hour: parseInt(e.target.value)})} />
            <input style={styles.input} type="number" placeholder="Seats" value={predForm.seats} onChange={(e) => setPredForm({...predForm, seats: parseInt(e.target.value)})} />
          </div>
          <button style={styles.predictBtn} onClick={handlePredict} disabled={loading}>
            {loading ? 'Predicting...' : '🤖 Predict Price'}
          </button>
          {prediction && (
            <div style={styles.result}>
              <h3>Prediction Result:</h3>
              <p>💰 Predicted Price: <strong>₹{prediction.predicted_price}</strong></p>
              <p>📍 Distance: <strong>{prediction.distance_km} km</strong></p>
              <p>📊 Price per km: <strong>₹{prediction.price_per_km}</strong></p>
            </div>
          )}
        </div>

        <div style={styles.card}>
          <h2>🚗 Available Rides</h2>
          {rides.length === 0 ? (
            <p>No rides available. <a href="/create-ride">Create one!</a></p>
          ) : (
            rides.map((ride, index) => (
              <div key={index} style={styles.rideCard}>
                <p>📍 From: <strong>{ride.pickup_location}</strong></p>
                <p>🎯 To: <strong>{ride.dropoff_location}</strong></p>
                <p>💺 Seats: <strong>{ride.available_seats}</strong></p>
                <p>💰 Price: <strong>₹{ride.price_per_seat}</strong></p>
                <p>🕐 Time: <strong>{ride.departure_time}</strong></p>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f0f2f5' },
  navbar: { backgroundColor: '#2c3e50', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  navTitle: { color: 'white', margin: 0 },
  navLink: { color: 'white', marginRight: '20px', textDecoration: 'none' },
  logoutBtn: { backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' },
  content: { padding: '30px' },
  card: { backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '20px' },
  cardDesc: { color: '#7f8c8d', marginBottom: '15px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' },
  input: { padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '14px' },
  predictBtn: { backgroundColor: '#9b59b6', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' },
  result: { backgroundColor: '#e8f8f5', padding: '15px', borderRadius: '5px', marginTop: '15px' },
  rideCard: { backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', marginBottom: '10px', borderLeft: '4px solid #3498db' }
};

export default Home;