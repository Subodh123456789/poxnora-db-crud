import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

const mockData = [
  { id: 1, title: 'Elven Mage', type: 'Champion', description: 'Master of elemental magic, dealing massive AoE damage.', icon: '🧙‍♂️' },
  { id: 2, title: 'Iron Golem', type: 'Champion', description: 'A massive tank that shields allies from incoming attacks.', icon: '🛡️' },
  { id: 3, title: 'Lightning Bolt', type: 'Spell', description: 'Deals instant damage to a single target.', icon: '⚡' },
  { id: 4, title: 'Healing Spring', type: 'Spell', description: 'Restores health to all allies in a small area over time.', icon: '💧' },
  { id: 5, title: 'Shadow Dagger', type: 'Equipment', description: 'Increases attack speed and critical strike chance.', icon: '🗡️' },
  { id: 6, title: 'Dragon Scale Armor', type: 'Equipment', description: 'Heavy armor that provides immense physical defense.', icon: '🐉' },
];

const Home = ({ searchQuery }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulating an API fetch (like the PoxNora API)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 800);
  }, []);

  // Filter logic based on search query
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Database Explorer</h2>
        <p style={styles.subtitle}>Browse through runes, champions, and equipment.</p>
      </div>

      {loading ? (
        <div style={styles.loader}>Loading Database...</div>
      ) : (
        <div style={styles.grid}>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id} className="card-hover">
                <Card 
                  title={item.title} 
                  type={item.type} 
                  description={item.description} 
                  icon={item.icon} 
                />
              </div>
            ))
          ) : (
            <p style={styles.noResults}>No results found for "{searchQuery}"</p>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 24px',
  },
  header: {
    marginBottom: '40px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.2rem',
    marginBottom: '8px',
  },
  subtitle: {
    color: 'var(--muted)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
  },
  loader: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: 'var(--primary2)',
    marginTop: '50px',
  },
  noResults: {
    textAlign: 'center',
    gridColumn: '1 / -1',
    color: 'var(--muted)',
    fontSize: '1.1rem',
  }
};

export default Home;