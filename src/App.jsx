import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';

const defaultItems = [
  {
    id: 1,
    title: 'Elven Mage',
    type: 'Champion',
    description: 'Master of elemental magic, dealing massive AoE damage across the battlefield.',
    icon: '🧙‍♂️',
  },
  {
    id: 2,
    title: 'Iron Golem',
    type: 'Champion',
    description: 'A massive tank that protects allies and absorbs incoming punishment.',
    icon: '🛡️',
  },
  {
    id: 3,
    title: 'Lightning Bolt',
    type: 'Spell',
    description: 'A fast, high-impact spell that strikes a single target with precision.',
    icon: '⚡',
  },
  {
    id: 4,
    title: 'Healing Spring',
    type: 'Spell',
    description: 'Restores health and sustains the whole team during long engagements.',
    icon: '💧',
  },
  {
    id: 5,
    title: 'Shadow Dagger',
    type: 'Equipment',
    description: 'Boosts critical chance and attack speed for agile damage dealers.',
    icon: '🗡️',
  },
  {
    id: 6,
    title: 'Dragon Scale Armor',
    type: 'Equipment',
    description: 'Heavy armor that improves survivability in prolonged frontline combat.',
    icon: '🐉',
  },
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('poxnora-items');
      return saved ? JSON.parse(saved) : defaultItems;
    } catch (error) {
      return defaultItems;
    }
  });

  useEffect(() => {
    localStorage.setItem('poxnora-items', JSON.stringify(items));
  }, [items]);

  return (
    <div className="App">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main>
        <Home searchQuery={searchQuery} items={items} setItems={setItems} />
      </main>
    </div>
  );
}

export default App;
