import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const API_KEY = 'bqbDmfF5WJdMwepNzuuMZDtQwz7gNpcoPue08l2GAkJSKpsOcE05Jqn4';

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
        pop: item.pop * 100, // Converti la probabilità di precipitazioni in percentuale
      });
    });

    // Ordina i dati per giorno
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => new Date(a.time) - new Date(b.time));
    });

    return grouped;
  };

  return (
    <Container fluid className="rain-chart">
      <h3 className="text-center">Probabilità di Pioggia</h3>
      {Object.keys(rainData).map((day) => (
        <Row key={day} className="mb-4">
          <Col>
            <h4>{day}</h4>
            <div className="d-flex justify-content-start">
              {rainData[day].map((bar, index) => (
                <div key={index} className="mx-3 text-center">
                  <div className="mb-2" style={{ height: `${bar.rain}%`, backgroundColor: bar.rain > 0 ? 'blue' : 'lightgrey', width: '20px' }}></div>
                  <div style={{ fontSize: '15px', marginTop: '8px' }}>
                    <div>{bar.time}</div>
                    <div>{bar.rain > 0 ? `${bar.rain}%` : `${bar.pop}%`}</div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default RainChart;
