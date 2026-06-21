function Footer() {
  return (
    <div style={styles.footer}>
      <p style={styles.text}>
        CarpoolPal — built by{' '}
        <a href="https://github.com/muskan-yadav18" target="_blank" rel="noreferrer" style={styles.link}>
          @muskan-yadav18
        </a>
        {' '}· © 2026 Muskan Yadav
      </p>
    </div>
  );
}

const styles = {
  footer: { backgroundColor: '#122A24', padding: '14px 0', textAlign: 'center' },
  text: { color: '#7E8D87', margin: 0, fontSize: 12.5, fontFamily: "'Inter', sans-serif" },
  link: { color: '#F2A93B', textDecoration: 'none', fontWeight: 600 }
};

export default Footer;