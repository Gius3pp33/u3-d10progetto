import React, { useState, useEffect } from 'react';
import { Button, Container, Form, ListGroup, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const API_KEY = '1e3b33eb0c23931c8d2c3a6ad26d0a97';

function SearchBar({ setCity }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (input) {
        console.log(`Fetching suggestions for: ${input}`);
        try {
          const response = await fetch(
            `http://api.openweathermap.org/data/2.5/find?q=${input}&type=like&sort=population&cnt=5&appid=${API_KEY}`
          );
          const data = await response.json();
          console.log('Suggestions fetched:', data);
          if (data.list) {
            setSuggestions(data.list.map(city => city.name));
            setError('');
          } else {
            setSuggestions([]);
            setError('Nessuna città trovata');
          }
        } catch (error) {
          console.log('Errore durante il fetching dei suggerimenti:', error);
          setSuggestions([]);
          setError('Errore durante il fetching dei suggerimenti');
        }
      } else {
        setSuggestions([]);
        setError('');
      }
    };

    fetchSuggestions();
  }, [input]);

  const checkCityValidity = async (city) => {
    console.log(`Controllo validity for city: ${city}`);
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const data = await response.json();
      console.log('City validity checked:', data);
      return response.ok;
    } catch (error) {
      console.error('Errore durante la verifica della città:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Submitting search for city: ${input}`);
    if (await checkCityValidity(input)) {
      console.log(`City ${input} is valid. Proceeding to weather page.`);
      setCity(input);
      navigate('/weather');
      setInput('');
      setSuggestions([]);
      setError('');
    } else {
      console.log(`City ${input} is invalid.`);
      setError('Città non esistente. Inserisci una città corretta o selezionane una dai suggerimenti.');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    console.log(`Suggestion clicked: ${suggestion}`);
    setCity(suggestion);
    navigate('/weather');
    setInput('');
    setSuggestions([]);
    setError('');
  };

  return (
    <Container fluid>
      <h1 id='title-page'>EpiMeteo</h1>
      <Container>
        <Form onSubmit={handleSubmit} className="d-flex align-items-center justify-content-center mb-4">
          <Form.Group className="position-relative">
            <Form.Control
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Cerca una città..."
              required
            />
            {suggestions.length > 0 && (
              <ListGroup className="position-absolute w-100">
                {suggestions.map((suggestion, index) => (
                  <ListGroup.Item 
                    key={index} 
                    action 
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Form.Group>
          <Button id='btn-title' type="submit">
            Cerca
          </Button>
        </Form>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Container>
    </Container>
  );
}

export default SearchBar;
