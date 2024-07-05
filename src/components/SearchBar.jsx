import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

function SearchBar({ setCity }) {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    setCity(input);
    setInput(''); 
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container fluid className="search-bar-container" style={styles.container}>
      <h1 >EpiMeteo</h1>
      <Container className="search-bar" style={styles.searchBar}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress} 
          placeholder="Cerca città..."
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>Cerca</button>
      </Container>
    </Container>
  );
}

const styles = {
 
  
  searchBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '400px',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '4px',
    
    
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    borderRadius: '4px',
    border: 'none',
    
    color: '#fff',
   
  },
};

export default SearchBar;
