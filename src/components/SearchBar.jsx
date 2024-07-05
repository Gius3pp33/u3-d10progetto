import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SearchBar({ setCity }) {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(input);
    navigate('/weather');
  };

  return (
    <Container fluid >
      <h1>EpiMeteo</h1>
      <Container>
      <Form onSubmit={handleSubmit} className="d-flex  align-items-center justify-content-center mb-4 ">
        <Form.Group >
          <Form.Control
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Cerca città..."
          />
        </Form.Group>
        <Button type="submit" className="bg-transparent border-secondary ">
          Cerca
        </Button>
      </Form>
      </Container>
    </Container>
  );
}

export default SearchBar;
