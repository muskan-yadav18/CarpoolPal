function Navbar({ active }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const links = [
    { href: '/home', label: 'Home', key: 'home' },
    { href: '/create-ride', label: 'Create Ride', key: 'create' },
    { href: '/features', label: 'Features', key: 'features' },
  ];

  return (
    <div style={styles.navbar}>
      <a href="/home" style={styles.brand}>
        <span style={styles.brandMark}>⟡</span> CarpoolPal
      </a>
      <div style={styles.links}>
        {links.map(l => (
          <a key={l.key} href={l.href}
            style={{ ...styles.link, ...(active === l.key ? styles.linkActive : {}) }}>
            {l.label}
          </a>
        ))}
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </div>
    </div>
  );
}

const styles = {
  navbar: { backgroundColor: '#122A24', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'Inter', sans-serif" },
  brand: { color: '#F4F6F1', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, letterSpacing: '-0.02em' },
  brandMark: { color: '#F2A93B', fontSize: 18 },
  links: { display: 'flex', alignItems: 'center', gap: 28 },
  link: { color: '#C9D6CE', textDecoration: 'none', fontSize: 14, fontWeight: 500 },
  linkActive: { color: '#FFFFFF', borderBottom: '2px solid #F2A93B', paddingBottom: 4 },
  logoutBtn: { backgroundColor: 'transparent', color: '#F2A93B', border: '1px solid #F2A93B', padding: '7px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }
};

export default Navbar;