import { useState } from 'react';
import { createRide } from '../services/api';

function CreateRide() {
  const [formData, setFormData] = useState({
    pickup_location: '',
    dropoff_location: '',
    pickup_lat: '',
    pickup_lng: '',
    dropoff_lat: '',
    dropoff_lng: '',
    available_seats: '',
    price_per_seat: '',
    departure_time: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }
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
      setSuccess('Ride created successfully!');
      setTimeout(() => { window.location.href = '/home'; }, 1500);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create ride!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🚗 Create a Ride</h1>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <input style={styles.input} type="text" name="pickup_location" placeholder="Pickup Location (e.g. VIT Bhopal)" value={formData.pickup_location} onChange={handleChange} />
        <input style={styles.input} type="text" name="dropoff_location" placeholder="Dropoff Location (e.g. Bhopal Station)" value={formData.dropoff_location} onChange={handleChange} />
        <input style={styles.input} type="number" name="pickup_lat" placeholder="Pickup Latitude" value={formData.pickup_lat} onChange={handleChange} />
        <input style={styles.input} type="number" name="pickup_lng" placeholder="Pickup Longitude" value={formData.pickup_lng} onChange={handleChange} />
        <input style={styles.input} type="number" name="dropoff_lat" placeholder="Dropoff Latitude" value={formData.dropoff_lat} onChange={handleChange} />
        <input style={styles.input} type="number" name="dropoff_lng" placeholder="Dropoff Longitude" value={formData.dropoff_lng} onChange={handleChange} />
        <input style={styles.input} type="number" name="available_seats" placeholder="Available Seats" value={formData.available_seats} onChange={handleChange} />
        <input style={styles.input} type="number" name="price_per_seat" placeholder="Price per Seat (₹)" value={formData.price_per_seat} onChange={handleChange} />
        <input style={styles.input} type="text" name="departure_time" placeholder="Departure Time (e.g. 10:00 AM)" value={formData.departure_time} onChange={handleChange} />

        <button style={styles.button} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating...' : 'Create Ride 🚗'}
        </button>

        <p style={styles.link}>
          <a href="/home" style={styles.anchor}>← Back to Home</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' },
  card: { backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '450px' },
  title: { textAlign: 'center', color: '#2c3e50', marginBottom: '20px' },
  input: { width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' },
  error: { color: 'red', textAlign: 'center', marginBottom: '10px' },
  success: { color: 'green', textAlign: 'center', marginBottom: '10px' },
  link: { textAlign: 'center', marginTop: '15px' },
  anchor: { color: '#3498db' }
};

export default CreateRide;