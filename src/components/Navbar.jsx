import React from 'react';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <h1 style={styles.logo}>
          Pox<span style={{ color: 'var(--primary2)' }}>Nora</span> DB
        </h1>
        
        <input
          type="text"
          placeholder="Search runes, champions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(10, 10, 15, 0.85)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--border)',
    padding: '15px 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: '700',
  },
  searchInput: {
    padding: '10px 16px',
    borderRadius: '50px',
    border: '1px solid var(--border)',
    background: 'var(--card)',
    color: 'var(--text)',
    outline: 'none',
    width: '280px',
    fontFamily: 'inherit',
    transition: '0.3s',
  }
};

export default Navbar;