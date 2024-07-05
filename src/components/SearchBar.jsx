import React, { useState } from 'react';

function SearchBar({ setCity }) {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    setCity(input);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Cerca città..."
      />
      <button onClick={handleSearch}>Cerca</button>
    </div>
  );
}

export default SearchBar;
