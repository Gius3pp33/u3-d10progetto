import React from 'react';
import { Alert } from 'react-bootstrap';

const NotFound = () => {
  return (
    <div className="text-center mt-5">
      <Alert variant="danger">
        <Alert.Heading>404 - Pagina non trovata</Alert.Heading>
        <p>La pagina che stai cercando non esiste.</p>
      </Alert>
    </div>
  );
};

export default NotFound;
