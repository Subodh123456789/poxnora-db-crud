import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="App">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main>
        <Home searchQuery={searchQuery} />
      </main>
    </div>
  );
}

export default App;
