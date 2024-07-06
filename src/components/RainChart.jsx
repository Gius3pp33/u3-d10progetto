import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function RainChart({ city, apiKey }) {
  const [rainData, setRainData] = useState([]);

  useEffect(() => {
    const fetchRainData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=it`);
        const data = await response.json();

        // Raggruppa i dati per giorno
        const groupedData = groupDataByDay(data.list);

        setRainData(groupedData);
      } catch (error) {
        console.error('Errore durante il recupero dei dati:', error);
      }
    };

    fetchRainData();
  }, [city, apiKey]);

  // Funzione per raggruppare i dati per giorno
  const groupDataByDay = (data) => {
    const grouped = {};
    data.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toLocaleDateString('it-IT', { weekday: 'long' });

      if (!grouped[dayKey]) {
        grouped[dayKey] = [];
      }

      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');

      grouped[dayKey].push({
        time: `${hours}:${minutes}`,
        rain: item.rain ? item.rain['3h'] : 0,
        pop: item.pop * 100, // Converte la probabilità di precipitazioni in percentuale
      });
    });

    // Ordina i dati per giorno
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => new Date(a.time) - new Date(b.time));
    });

    return grouped;
  };

  return (
    <Container className="rain-chart lead d-none d-sm-block" style={{ maxWidth: '500px', position: 'relative' }}>
      <h3 className="text-center">Probabilità di Pioggia🌧</h3>
    
      {Object.keys(rainData).map((day) => (
        <Row key={day} className="mb-4">
          <Col className="d-none d-sm-inline" md={12} lg={12}>
            <h4>{day}</h4>
            <div className="d-flex justify-content-start">
              {rainData[day].map((bar, index) => (
                <div key={index} className="mx-3 text-center" style={{ width: 'calc(100% / 24)' }}>
                  <div className="mb-2" style={{ height: `${bar.rain}%`, backgroundColor: bar.rain > 0 ? 'blue' : 'lightgrey' }}></div>
                  <div style={{ fontSize: '13px', marginTop: '8px' }}>
                    <div>{bar.rain > 0 ? `${bar.rain}%` : `${bar.pop}%`}</div>
                    <div>{bar.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      ))}
      <Card className="legend-card d-none d-lg-block" style={{
        position: 'absolute',
        top: '0px',
        right: '-300px',
        width: '250px'
      }}>
        <Card.Body style={{ backgroundColor: '#062026', color: 'white', borderRadius: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '30px', height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></div>
            <span className='lead' style={{ fontSize: '12px' }}>Indica la densità di pioggia prevista,in base alla percentuale.</span>
          </div>
        </Card.Body>
      </Card>
      <Card className="legend-card d-block d-lg-none" style={{
        position: 'relative',
        marginTop: '20px',
        width: '100%'
      }}>
        <Card.Body style={{ backgroundColor: '#062026', color: 'white',  borderRadius: '10px ' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '30px', height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></div>
            <span className='lead' style={{ fontSize: '12px' }}>Indica la densità di pioggia prevista,in base alla percentuale.</span>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RainChart;
