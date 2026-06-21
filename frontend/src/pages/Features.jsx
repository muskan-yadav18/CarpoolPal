import { useState } from 'react';
import { calculateCarbon, calculateSplit, calculateTrust } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Features() {
  const [carbonForm, setCarbonForm] = useState({ distance_km: '', num_passengers: '' });
  const [carbonResult, setCarbonResult] = useState(null);
  const [splitForm, setSplitForm] = useState({ total_price: '', num_passengers: '' });
  const [splitResult, setSplitResult] = useState(null);
  const [trustForm, setTrustForm] = useState({ rating: '', total_rides: '', cancellations: '', punctuality_score: '' });
  const [trustResult, setTrustResult] = useState(null);
  const [loading, setLoading] = useState({ carbon: false, split: false, trust: false });

  const handleCarbon = async () => {
    setLoading({ ...loading, carbon: true });
    try {
      const result = await calculateCarbon({ distance_km: parseFloat(carbonForm.distance_km), num_passengers: parseInt(carbonForm.num_passengers) });
      setCarbonResult(result);
    } catch (err) { console.error(err); } finally { setLoading({ ...loading, carbon: false }); }
  };

  const handleSplit = async () => {
    setLoading({ ...loading, split: true });
    try {
      const result = await calculateSplit({ total_price: parseFloat(splitForm.total_price), num_passengers: parseInt(splitForm.num_passengers) });
      setSplitResult(result);
    } catch (err) { console.error(err); } finally { setLoading({ ...loading, split: false }); }
  };

  const handleTrust = async () => {
    setLoading({ ...loading, trust: true });
    try {
      const result = await calculateTrust({
        rating: parseFloat(trustForm.rating), total_rides: parseInt(trustForm.total_rides),
        cancellations: parseInt(trustForm.cancellations), punctuality_score: parseFloat(trustForm.punctuality_score)
      });
      setTrustResult(result);
    } catch (err) { console.error(err); } finally { setLoading({ ...loading, trust: false }); }
  };

  return (
    <div style={styles.page}>
      <Navbar active="features" />
      <div style={styles.content}>

        <div style={styles.card}>
          <span style={{...styles.eyebrow, color: '#1F6F54'}}>ENVIRONMENT</span>
          <h2 style={styles.cardTitle}>Carbon footprint tracker</h2>
          <p style={styles.cardDesc}>See how much CO2 you save by sharing this ride.</p>
          <div style={styles.row}>
            <div style={{flex: 1}}>
              <label style={styles.label}>Distance (km)</label>
              <input style={styles.input} type="number" value={carbonForm.distance_km} onChange={(e) => setCarbonForm({...carbonForm, distance_km: e.target.value})} />
            </div>
            <div style={{flex: 1}}>
              <label style={styles.label}>Passengers</label>
              <input style={styles.input} type="number" value={carbonForm.num_passengers} onChange={(e) => setCarbonForm({...carbonForm, num_passengers: e.target.value})} />
            </div>
          </div>
          <button style={{...styles.btn, backgroundColor: '#1F6F54'}} onClick={handleCarbon} disabled={loading.carbon}>
            {loading.carbon ? 'Calculating…' : 'Calculate CO₂ saved'}
          </button>
          {carbonResult && (
            <div style={styles.resultRow}>
              <div style={styles.resultItem}><span style={styles.resultLabel}>CO₂ saved</span><span style={styles.resultValue}>{carbonResult.co2_saved_kg} kg</span></div>
              <div style={styles.resultItem}><span style={styles.resultLabel}>Trees equivalent</span><span style={styles.resultValue}>{carbonResult.trees_equivalent}</span></div>
              <div style={styles.resultItem}><span style={styles.resultLabel}>Solo emission</span><span style={styles.resultValue}>{carbonResult.solo_emission_kg} kg</span></div>
            </div>
          )}
        </div>

        <div style={styles.card}>
          <span style={{...styles.eyebrow, color: '#2563A8'}}>PAYMENTS</span>
          <h2 style={styles.cardTitle}>Split payment calculator</h2>
          <p style={styles.cardDesc}>Find out exactly what each rider owes.</p>
          <div style={styles.row}>
            <div style={{flex: 1}}>
              <label style={styles.label}>Total price (₹)</label>
              <input style={styles.input} type="number" value={splitForm.total_price} onChange={(e) => setSplitForm({...splitForm, total_price: e.target.value})} />
            </div>
            <div style={{flex: 1}}>
              <label style={styles.label}>Passengers</label>
              <input style={styles.input} type="number" value={splitForm.num_passengers} onChange={(e) => setSplitForm({...splitForm, num_passengers: e.target.value})} />
            </div>
          </div>
          <button style={{...styles.btn, backgroundColor: '#2563A8'}} onClick={handleSplit} disabled={loading.split}>
            {loading.split ? 'Calculating…' : 'Calculate split'}
          </button>
          {splitResult && (
            <div style={styles.resultRow}>
              <div style={styles.resultItem}><span style={styles.resultLabel}>Per person</span><span style={styles.resultValue}>₹{splitResult.per_person}</span></div>
              <div style={styles.resultItem}><span style={styles.resultLabel}>Platform fee</span><span style={styles.resultValue}>₹{splitResult.platform_fee}</span></div>
              <div style={styles.resultItem}><span style={styles.resultLabel}>Final amount</span><span style={styles.resultValue}>₹{splitResult.final_per_person}</span></div>
            </div>
          )}
        </div>

        <div style={styles.card}>
          <span style={{...styles.eyebrow, color: '#B5862D'}}>SAFETY</span>
          <h2 style={styles.cardTitle}>Trust score</h2>
          <p style={styles.cardDesc}>A combined score from rating, history, and reliability.</p>
          <div style={styles.grid4}>
            <div>
              <label style={styles.label}>Rating (1–5)</label>
              <input style={styles.input} type="number" value={trustForm.rating} onChange={(e) => setTrustForm({...trustForm, rating: e.target.value})} />
            </div>
            <div>
              <label style={styles.label}>Total rides</label>
              <input style={styles.input} type="number" value={trustForm.total_rides} onChange={(e) => setTrustForm({...trustForm, total_rides: e.target.value})} />
            </div>
            <div>
              <label style={styles.label}>Cancellations</label>
              <input style={styles.input} type="number" value={trustForm.cancellations} onChange={(e) => setTrustForm({...trustForm, cancellations: e.target.value})} />
            </div>
            <div>
              <label style={styles.label}>Punctuality (%)</label>
              <input style={styles.input} type="number" value={trustForm.punctuality_score} onChange={(e) => setTrustForm({...trustForm, punctuality_score: e.target.value})} />
            </div>
          </div>
          <button style={{...styles.btn, backgroundColor: '#B5862D'}} onClick={handleTrust} disabled={loading.trust}>
            {loading.trust ? 'Calculating…' : 'Calculate trust score'}
          </button>
          {trustResult && (
            <div style={styles.resultRow}>
              <div style={styles.resultItem}><span style={styles.resultLabel}>Score</span><span style={styles.resultValue}>{trustResult.trust_score}/100</span></div>
              <div style={styles.resultItem}><span style={styles.resultLabel}>Level</span><span style={styles.resultValue}>{trustResult.trust_level}</span></div>
            </div>
          )}
        </div>

      </div>
      <Footer />
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', backgroundColor: '#F4F6F1', fontFamily: "'Inter', sans-serif" },
  content: { padding: '40px 32px 80px', maxWidth: 760, margin: '0 auto' },
  card: { backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E2E6DB', marginBottom: '24px' },
  eyebrow: { fontSize: 11.5, fontWeight: 700, letterSpacing: '0.08em' },
  cardTitle: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 21, fontWeight: 600, color: '#122A24', margin: '6px 0 6px' },
  cardDesc: { color: '#5C6B66', fontSize: 14, marginBottom: 18 },
  row: { display: 'flex', gap: '14px', marginBottom: '16px' },
  grid4: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' },
  label: { display: 'block', fontSize: 12, fontWeight: 600, color: '#3C4A45', marginBottom: 5 },
  input: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E6DB', fontSize: 14, boxSizing: 'border-box', backgroundColor: '#F9FAF5', fontFamily: "'Inter', sans-serif" },
  btn: { color: '#FFFFFF', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: 14.5, fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif" },
  resultRow: { display: 'flex', gap: '20px', marginTop: '18px', backgroundColor: '#F9FAF5', borderRadius: '10px', padding: '16px', flexWrap: 'wrap' },
  resultItem: { display: 'flex', flexDirection: 'column', gap: 4 },
  resultLabel: { fontSize: 11, color: '#5C6B66', textTransform: 'uppercase', letterSpacing: '0.04em' },
  resultValue: { fontSize: 18, fontWeight: 700, color: '#122A24', fontFamily: "'Space Grotesk', sans-serif" }
};

export default Features;