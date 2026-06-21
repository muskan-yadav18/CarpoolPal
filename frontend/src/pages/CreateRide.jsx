import { useState } from 'react';
import { createRide } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RouteLine from '../components/RouteLine';

function CreateRide() {
  const [formData, setFormData] = useState({
    pickup_location: '', dropoff_location: '',
    pickup_lat: '', pickup_lng: '', dropoff_lat: '', dropoff_lng: '',
    available_seats: '', price_per_seat: '', departure_time: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      const token = localStorage.getItem('token');
      if (!token) { window.location.href = '/login'; return; }
      const rideData = {
        ...formData,
        pickup_lat: parseFloat(formData.pickup_lat),
        pickup_lng: parseFloat(formData.pickup_lng),
        dropoff_lat: parseFloat(formData.dropoff_lat),
        dropoff_lng: parseFloat(formData.dropoff_lng),
        available_seats: parseInt(formData.available_seats),
        price_per_seat: parseFloat(formData.price_per_seat)
      };
      await createRide(rideData, token);
      setSuccess('Ride published!');
      setTimeout(() => { window.location.href = '/home'; }, 1400);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create ride!');
    } finally { setLoading(false); }
  };

  return (
    <div style={styles.page}>
      <Navbar active="create" />
      <div style={styles.container}>
        <div style={styles.card}>
          <span style={styles.eyebrow}>NEW RIDE</span>
          <h1 style={styles.title}>Offer a ride</h1>
          <p style={styles.subtitle}>Set your route and let riders find you.</p>

          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}

          <form onSubmit={handleSubmit}>
            <div style={styles.row}>
              <div style={{flex: 1}}>
                <label style={styles.label}>Pickup location</label>
                <input style={styles.input} type="text" name="pickup_location" placeholder="VIT Bhopal" value={formData.pickup_location} onChange={handleChange} />
              </div>
              <div style={{flex: 1}}>
                <label style={styles.label}>Dropoff location</label>
                <input style={styles.input} type="text" name="dropoff_location" placeholder="Bhopal Station" value={formData.dropoff_location} onChange={handleChange} />
              </div>
            </div>

            <RouteLine from={formData.pickup_location || 'Pickup'} to={formData.dropoff_location || 'Dropoff'} />

            <div style={styles.grid}>
              <div>
                <label style={styles.label}>Pickup latitude</label>
                <input style={styles.input} type="number" name="pickup_lat" value={formData.pickup_lat} onChange={handleChange} />
              </div>
              <div>
                <label style={styles.label}>Pickup longitude</label>
                <input style={styles.input} type="number" name="pickup_lng" value={formData.pickup_lng} onChange={handleChange} />
              </div>
              <div>
                <label style={styles.label}>Dropoff latitude</label>
                <input style={styles.input} type="number" name="dropoff_lat" value={formData.dropoff_lat} onChange={handleChange} />
              </div>
              <div>
                <label style={styles.label}>Dropoff longitude</label>
                <input style={styles.input} type="number" name="dropoff_lng" value={formData.dropoff_lng} onChange={handleChange} />
              </div>
              <div>
                <label style={styles.label}>Available seats</label>
                <input style={styles.input} type="number" name="available_seats" value={formData.available_seats} onChange={handleChange} />
              </div>
              <div>
                <label style={styles.label}>Price per seat (₹)</label>
                <input style={styles.input} type="number" name="price_per_seat" value={formData.price_per_seat} onChange={handleChange} />
              </div>
            </div>

            <label style={styles.label}>Departure time</label>
            <input style={styles.input} type="text" name="departure_time" placeholder="10:00 AM" value={formData.departure_time} onChange={handleChange} />

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Publishing…' : 'Publish ride'}
            </button>
          </form>

          <p style={styles.link}><a href="/home" style={styles.anchor}>← Back to home</a></p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', backgroundColor: '#F4F6F1', fontFamily: "'Inter', sans-serif" },
  container: { display: 'flex', justifyContent: 'center', padding: '40px 24px 80px' },
  card: { backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '16px', border: '1px solid #E2E6DB', width: '520px' },
  eyebrow: { fontSize: 11.5, fontWeight: 700, color: '#1F6F54', letterSpacing: '0.08em' },
  title: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 600, color: '#122A24', margin: '6px 0 4px' },
  subtitle: { color: '#5C6B66', fontSize: 14, marginBottom: 22 },
  row: { display: 'flex', gap: '14px', marginBottom: '6px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' },
  label: { display: 'block', fontSize: 12, fontWeight: 600, color: '#3C4A45', marginBottom: 5, marginTop: 10 },
  input: { width: '100%', padding: '11px 12px', borderRadius: '8px', border: '1px solid #E2E6DB', fontSize: 14, boxSizing: 'border-box', backgroundColor: '#F9FAF5', fontFamily: "'Inter', sans-serif" },
  button: { width: '100%', padding: '13px', backgroundColor: '#1F6F54', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: 15, fontWeight: 600, cursor: 'pointer', marginTop: 22, fontFamily: "'Inter', sans-serif" },
  error: { color: '#D1453B', backgroundColor: '#FBEAE8', padding: '10px 12px', borderRadius: '8px', fontSize: 13.5, marginBottom: 16 },
  success: { color: '#1F6F54', backgroundColor: '#EAF6EF', padding: '10px 12px', borderRadius: '8px', fontSize: 13.5, marginBottom: 16 },
  link: { textAlign: 'center', marginTop: 20, fontSize: 14 },
  anchor: { color: '#1F6F54', fontWeight: 600, textDecoration: 'none' }
};

export default CreateRide;