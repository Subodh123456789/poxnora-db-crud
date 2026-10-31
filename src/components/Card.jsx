import React from 'react';

const Card = ({ title, type, description, icon }) => {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.icon}>{icon}</span>
        <span style={styles.badge}>{type}</span>
      </div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.desc}>{description}</p>
      <button style={styles.btn}>View Details</button>
    </div>
  );
};

const styles = {
  card: {
    background: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s, borderColor 0.3s',
    cursor: 'pointer',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  icon: {
    fontSize: '1.8rem',
  },
  badge: {
    background: 'rgba(108, 92, 231, 0.2)',
    color: 'var(--primary2)',
    padding: '4px 12px',
    borderRadius: '50px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  title: {
    fontSize: '1.2rem',
    marginBottom: '8px',
  },
  desc: {
    color: 'var(--muted)',
    fontSize: '0.9rem',
    marginBottom: '20px',
    flexGrow: 1,
  },
  btn: {
    background: 'transparent',
    border: '1px solid var(--primary2)',
    color: 'var(--primary2)',
    padding: '8px 16px',
    borderRadius: '50px',
    fontFamily: 'inherit',
    fontWeight: '600',
    cursor: 'pointer',
    transition: '0.3s',
  }
};

// Add hover effect via inline event (or you can move this to a CSS class)
document.addEventListener('mouseover', function(e) {
  if (e.target.closest('.card-hover')) {
    e.target.closest('.card-hover').style.transform = 'translateY(-5px)';
    e.target.closest('.card-hover').style.borderColor = 'var(--primary2)';
  }
});
document.addEventListener('mouseout', function(e) {
  if (e.target.closest('.card-hover')) {
    e.target.closest('.card-hover').style.transform = 'translateY(0)';
    e.target.closest('.card-hover').style.borderColor = 'var(--border)';
  }
});

export default Card;