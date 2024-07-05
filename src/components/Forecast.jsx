import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';



function Forecast({ city, apiKey }) {
  const [forecastData, setForecastData] = useState([]); // State per memorizzare i dati delle previsioni
  // useEffect per gestire la fetch dei dati delle previsioni
  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=it`);
        const data = await response.json();
        setForecastData(data.list);
      } catch (error) {
        console.log(`Errore durante il recupero dei dati: ${error.message}`);
      }
    };

    fetchForecastData(); // Chiamo la funzione fetchForecastData al caricamento del componente o quando cambiano city o apiKey
  }, [city, apiKey]);

   // Funzione per ottenere l'URL dell'icona del meteo
  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  // Funzione per raggruppare le previsioni per giorno
  const groupForecastByDay = () => {
    const dailyForecasts = {};
    forecastData.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString(); // ottengo la data locale dalla previsione
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = forecast; // aggiungo la previsione al gruppo per quella data
      }
    });
    return Object.values(dailyForecasts); // Restituisce le previsioni raggruppate per giorno
  
  };

  // qui ottengo le previsioni raggruppate per giorno
  const dailyForecasts = groupForecastByDay();

  return (
    <Container fluid className="forecast">
      <h3 className=" mt-3 mb-4">Previsioni della settimana</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {dailyForecasts.map((forecast, index) => (
          <Col key={index}>
            <div className="forecast-day card bg-transparent border-0">
              <div className="card-body text-white text-center">
                <p className="mb-0">{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
                <img src={getWeatherIconUrl(forecast.weather[0].icon)} alt={forecast.weather[0].description} className="forecast-icon" />
                <p className="mb-1">Temp. media di: {forecast.main.temp}°C</p>
                <p className="mb-0">{forecast.weather[0].description}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Forecast;
