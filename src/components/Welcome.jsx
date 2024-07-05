import React, { useState, useEffect } from 'react';


const Welcome = ({ timeout }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout]);

  if (!show) {
    return null;
  }

  return (
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Benvenuto!</strong> Questo è il miglior sito di previsioni meteo.
      <button type="button" className="btn-close" aria-label="Close" onClick={() => setShow(false)}></button>
    </div>
  );
};

export default Welcome;
