import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>YouthConnect</Link>
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Accueil</Link>
          <Link to="/education" style={styles.link}>Éducation</Link>
          <Link to="/forum" style={styles.link}>Forum</Link>
          <Link to="/about" style={styles.link}>À propos</Link>
          <Link to="/login" style={styles.link}>Connexion</Link>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#28a745',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    zIndex: 1000,
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
  },
  logo: {
    fontWeight: '700',
    fontSize: '1.5rem',
    textDecoration: 'none',
    color: 'white',
  },
  links: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'color 0.3s',
  },
};

export default Navbar;
