import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function CurrentWeather({ data }) {
  const { main, weather, wind, sys } = data;
  const [cityImage, setCityImage] = useState('');

  useEffect(() => {
    const fetchCityImage = async () => {
      try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${data.name}&per_page=1`, {
          headers: {
            Authorization: 'bqbDmfF5WJdMwepNzuuMZDtQwz7gNpcoPue08l2GAkJSKpsOcE05Jqn4',
          },
        });
        const imageData = await response.json();
        if (imageData.photos && imageData.photos.length > 0) {
          setCityImage(imageData.photos[0].src.large);
        } else {
          console.log('Nessuna immagine trovata per la città');
        }
      } catch (error) {
        console.log('Errore durante il recupero dell\'immagine:', error);
      }
    };

    fetchCityImage();
  }, [data.name]);

  return (
    <Container fluid className="current-weather">
      <Row>
        <Col md={6} className="order-md-1 order-2">
          <div className="weather-details">
            <h2>{data.name}</h2>
            <p>Temperatura: {main.temp}°C</p>
            <p>Condizioni: {weather[0].description}</p>
            <p>Vento: {wind.speed} km/h</p>
            <p>Umidità: {main.humidity}%</p>
            <p>Alba: {new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p>Tramonto: {new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
          </div>
        </Col>
        <Col md={6} className="order-md-2 order-1">
          {cityImage && <img src={cityImage} alt="Immagine della città cercata" className="city-image img-fluid" />}
        </Col>
      </Row>
    </Container>
  );
}

export default CurrentWeather;
