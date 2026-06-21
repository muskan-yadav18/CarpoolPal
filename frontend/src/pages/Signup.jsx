import { useState } from 'react';
import { signup } from '../services/api';
import RouteLine from '../components/RouteLine';

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await signup(formData);
      localStorage.setItem('token', response.token);
      window.location.href = '/home';
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed!');
    } finally { setLoading(false); }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.brandRow}>
          <span style={styles.brandMark}>⟡</span>
          <span style={styles.brandName}>CarpoolPal</span>
        </div>
        <RouteLine />
        <h2 style={styles.title}>Create your account</h2>
        <p style={styles.subtitle}>Join your campus carpool community</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Full name</label>
          <input style={styles.input} type="text" name="name" placeholder="Muskan Yadav" value={formData.name} onChange={handleChange} />

          <label style={styles.label}>Email</label>
          <input style={styles.input} type="email" name="email" placeholder="you@vitbhopal.ac.in" value={formData.email} onChange={handleChange} />

          <label style={styles.label}>Password</label>
          <input style={styles.input} type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} />

          <label style={styles.label}>Phone number</label>
          <input style={styles.input} type="text" name="phone" placeholder="9999999999" value={formData.phone} onChange={handleChange} />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Creating account…' : 'Sign up'}
          </button>
        </form>

        <p style={styles.link}>
          Already have an account? <a href="/login" style={styles.anchor}>Log in</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F4F6F1', fontFamily: "'Inter', sans-serif", padding: '24px' },
  card: { backgroundColor: '#FFFFFF', padding: '44px 40px', borderRadius: '16px', boxShadow: '0 1px 2px rgba(18,42,36,0.04), 0 16px 40px rgba(18,42,36,0.08)', width: '420px', border: '1px solid #E2E6DB' },
  brandRow: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 },
  brandMark: { color: '#F2A93B', fontSize: 20 },
  brandName: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 19, color: '#122A24', letterSpacing: '-0.02em' },
  title: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 26, color: '#122A24', margin: '4px 0 4px' },
  subtitle: { color: '#5C6B66', fontSize: 14, margin: '0 0 24px' },
  label: { display: 'block', fontSize: 12.5, fontWeight: 600, color: '#3C4A45', marginBottom: 6, marginTop: 14, textTransform: 'uppercase', letterSpacing: '0.04em' },
  input: { width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #E2E6DB', fontSize: 15, boxSizing: 'border-box', fontFamily: "'Inter', sans-serif", backgroundColor: '#F9FAF5', outline: 'none' },
  button: { width: '100%', padding: '13px', backgroundColor: '#1F6F54', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: 15, fontWeight: 600, cursor: 'pointer', marginTop: 22, fontFamily: "'Inter', sans-serif" },
  error: { color: '#D1453B', backgroundColor: '#FBEAE8', padding: '10px 12px', borderRadius: '8px', fontSize: 13.5, marginBottom: 16 },
  link: { textAlign: 'center', marginTop: 22, fontSize: 14, color: '#5C6B66' },
  anchor: { color: '#1F6F54', fontWeight: 600, textDecoration: 'none' }
};

export default Signup;