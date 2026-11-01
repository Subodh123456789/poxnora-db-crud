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
          aria-label="Search database entries"
          placeholder="Search champions, spells, equipment..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
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
    zIndex: 10,
    background: 'rgba(10, 10, 15, 0.88)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--border)',
    padding: '15px 0',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
  },
  logo: {
    fontSize: '1.6rem',
    fontWeight: 700,
    letterSpacing: '-0.04em',
  },
  searchInput: {
    padding: '12px 18px',
    borderRadius: '50px',
    border: '1px solid var(--border)',
    background: 'var(--card)',
    color: 'var(--text)',
    outline: 'none',
    width: 'min(420px, 100%)',
    fontFamily: 'inherit',
    fontSize: '0.95rem',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.15)',
  },
};

export default Navbar;
