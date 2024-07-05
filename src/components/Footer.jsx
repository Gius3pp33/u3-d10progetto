import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3">
      <Container className="text-center">
        <p>&copy; {new Date().getFullYear()} EpiMeteo. Tutti i diritti sono riservati.</p>
       
      </Container>
    </footer>
  );
};

export default Footer;
