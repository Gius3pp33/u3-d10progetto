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
    <div className="alert alert-warning alert-dismissible fade show text-center" role="alert">
      <strong>Benvenuto!</strong> Cerca la tua città per iniziare,buona navigazione.
      <button type="button" className="btn-close" aria-label="Close" onClick={() => setShow(false)}></button>
    </div>
  );
};

export default Welcome;
