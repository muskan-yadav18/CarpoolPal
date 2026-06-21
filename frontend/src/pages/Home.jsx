import { useState, useEffect } from 'react';
import { getAllRides, predictPrice } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RouteLine from '../components/RouteLine';

function Home() {
  const [rides, setRides] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predForm, setPredForm] = useState({
    pickup_lat: 23.2599, pickup_lng: 77.4126,
    dropoff_lat: 23.3441, dropoff_lng: 77.4119,
    hour: 9, day: 1, seats: 2
  });

  useEffect(() => { fetchRides(); }, []);

  const fetchRides = async () => {
    try {
      const data = await getAllRides();
      setRides(data.rides);
    } catch (err) { console.error('Error fetching rides:', err); }
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const result = await predictPrice(predForm);
      setPrediction(result);
    } catch (err) { console.error('Prediction error:', err); }
    finally { setLoading(false); }
  };

  return (
    <div style={styles.container}>
      <Navbar active="home" />

      <div style={styles.content}>
        <div style={styles.card}>
          <span style={styles.eyebrow}>AI PRICE PREDICTOR</span>
          <h2 style={styles.cardTitle}>What should this ride cost?</h2>
          <p style={styles.cardDesc}>Enter pickup and dropoff details — the model factors in distance, time of day, and seats.</p>

          <RouteLine from="Pickup" to="Dropoff" />

          <div style={styles.grid}>
            <div>
              <label style={styles.label}>Pickup latitude</label>
              <input style={styles.input} type="number" value={predForm.pickup_lat} onChange={(e) => setPredForm({...predForm, pickup_lat: parseFloat(e.target.value)})} />
            </div>
            <div>
              <label style={styles.label}>Pickup longitude</label>
              <input style={styles.input} type="number" value={predForm.pickup_lng} onChange={(e) => setPredForm({...predForm, pickup_lng: parseFloat(e.target.value)})} />
            </div>
            <div>
              <label style={styles.label}>Dropoff latitude</label>
              <input style={styles.input} type="number" value={predForm.dropoff_lat} onChange={(e) => setPredForm({...predForm, dropoff_lat: parseFloat(e.target.value)})} />
            </div>
            <div>
              <label style={styles.label}>Dropoff longitude</label>
              <input style={styles.input} type="number" value={predForm.dropoff_lng} onChange={(e) => setPredForm({...predForm, dropoff_lng: parseFloat(e.target.value)})} />
            </div>
            <div>
              <label style={styles.label}>Hour (0–23)</label>
              <input style={styles.input} type="number" value={predForm.hour} onChange={(e) => setPredForm({...predForm, hour: parseInt(e.target.value)})} />
            </div>
            <div>
              <label style={styles.label}>Seats</label>
              <input style={styles.input} type="number" value={predForm.seats} onChange={(e) => setPredForm({...predForm, seats: parseInt(e.target.value)})} />
            </div>
          </div>

          <button style={styles.predictBtn} onClick={handlePredict} disabled={loading}>
            {loading ? 'Calculating…' : 'Predict price'}
          </button>

          {prediction && (
            <div style={styles.resultRow}>
              <div style={styles.resultItem}><span style={styles.resultLabel}>Predicted price</span><span style={styles.resultValue}>₹{prediction.predicted_price}</span></div>
              <div style={styles.resultItem}><span style={styles.resultLabel}>Distance</span><span style={styles.resultValue}>{prediction.distance_km} km</span></div>
              <div style={styles.resultItem}><span style={styles.resultLabel}>Price / km</span><span style={styles.resultValue}>₹{prediction.price_per_km}</span></div>
            </div>
          )}
        </div>

        <div style={styles.card}>
          <span style={styles.eyebrow}>{rides.length} ACTIVE</span>
          <h2 style={styles.cardTitle}>Available rides</h2>

          {rides.length === 0 ? (
            <p style={styles.emptyState}>No rides yet. <a href="/create-ride" style={styles.anchor}>Be the first to offer one →</a></p>
          ) : (
            rides.map((ride, index) => (
              <div key={index} style={styles.rideCard}>
                <RouteLine from={ride.pickup_location} to={ride.dropoff_location} />
                <div style={styles.rideMeta}>
                  <span style={styles.rideMetaItem}>💺 {ride.available_seats} seats</span>
                  <span style={styles.rideMetaItem}>🕐 {ride.departure_time}</span>
                  <span style={styles.ridePrice}>₹{ride.price_per_seat}</span>
                </div>
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
  container: { minHeight: '100vh', backgroundColor: '#F4F6F1', fontFamily: "'Inter', sans-serif" },
  content: { padding: '40px 32px 80px', maxWidth: 880, margin: '0 auto' },
  card: { backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E2E6DB', marginBottom: '24px' },
  eyebrow: { fontSize: 11.5, fontWeight: 700, color: '#1F6F54', letterSpacing: '0.08em' },
  cardTitle: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 600, color: '#122A24', margin: '6px 0 6px' },
  cardDesc: { color: '#5C6B66', fontSize: 14, marginBottom: 20 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' },
  label: { display: 'block', fontSize: 12, fontWeight: 600, color: '#3C4A45', marginBottom: 5 },
  input: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E6DB', fontSize: 14, boxSizing: 'border-box', backgroundColor: '#F9FAF5', fontFamily: "'Inter', sans-serif" },
  predictBtn: { backgroundColor: '#122A24', color: '#FFFFFF', border: 'none', padding: '13px 28px', borderRadius: '8px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif" },
  resultRow: { display: 'flex', gap: '16px', marginTop: '22px', backgroundColor: '#F0F8F4', borderRadius: '10px', padding: '18px', flexWrap: 'wrap' },
  resultItem: { display: 'flex', flexDirection: 'column', gap: 4 },
  resultLabel: { fontSize: 11.5, color: '#5C6B66', textTransform: 'uppercase', letterSpacing: '0.04em' },
  resultValue: { fontSize: 20, fontWeight: 700, color: '#122A24', fontFamily: "'Space Grotesk', sans-serif" },
  emptyState: { color: '#5C6B66', fontSize: 14 },
  anchor: { color: '#1F6F54', fontWeight: 600, textDecoration: 'none' },
  rideCard: { backgroundColor: '#F9FAF5', borderRadius: '10px', padding: '16px 18px', marginBottom: '10px', border: '1px solid #E2E6DB' },
  rideMeta: { display: 'flex', alignItems: 'center', gap: '16px', marginTop: '6px' },
  rideMetaItem: { fontSize: 13, color: '#5C6B66' },
  ridePrice: { fontSize: 15, fontWeight: 700, color: '#1F6F54', marginLeft: 'auto', fontFamily: "'Space Grotesk', sans-serif" }
};

export default Home;