function Footer() {
  return (
    <div style={styles.footer}>
      <p style={styles.text}>
        🚗 CarpoolPal | Built with ❤️ by{' '}
        <a 
          href="https://github.com/muskan-yadav18" 
          target="_blank" 
          style={styles.link}
        >
          @muskan-yadav18
        </a>
        {' '}| © 2026 Muskan Yadav. All rights reserved.
      </p>
    </div>
  );
}

const styles = {
  footer: {
    backgroundColor: '#2c3e50',
    padding: '15px',
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%'
  },
  text: {
    color: '#bdc3c7',
    margin: 0,
    fontSize: '13px'
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};

export default Footer;