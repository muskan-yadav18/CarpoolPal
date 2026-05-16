// Import React and useState hook
import { useState } from 'react';

// Import signup function from api service
import { signup } from '../services/api';

function Signup() {
  // Store form data in state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  // Store error message
  const [error, setError] = useState('');

  // Store loading state
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call signup API
      const response = await signup(formData);

      // Save token to localStorage
      localStorage.setItem('token', response.token);

      // Redirect to home page
      window.location.href = '/home';
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🚗 CarpoolPal</h1>
        <h2 style={styles.subtitle}>Create Account</h2>

        {/* Show error if any */}
        {error && <p style={styles.error}>{error}</p>}

        <div>
          {/* Name input */}
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          {/* Email input */}
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password input */}
          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Phone input */}
          <input
            style={styles.input}
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* Submit button */}
          <button
            style={styles.button}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          {/* Link to login page */}
          <p style={styles.link}>
            Already have an account?{' '}
            <a href="/login" style={styles.anchor}>Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5'
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '400px'
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '5px'
  },
  subtitle: {
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '10px'
  },
  link: {
    textAlign: 'center',
    marginTop: '15px'
  },
  anchor: {
    color: '#2ecc71'
  }
};

export default Signup