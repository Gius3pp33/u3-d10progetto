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
            <h2 className='mb-5 '>{data.name}</h2>
            <h4 className='mb-3 lead'>Temperatura: {main.temp}°C</h4>
            <h4 className='mb-3 lead'>Condizioni: {weather[0].description}</h4>
            <h4 className='mb-3 lead'>Vento: {wind.speed} km/h</h4>
            <h4 className='mb-3 lead'>Umidità: {main.humidity}%</h4>
            <h4 className='mb-3 lead'>Alba: {new Date(sys.sunrise * 1000).toLocaleTimeString()}</h4>
            <h4 className='lead'>Tramonto: {new Date(sys.sunset * 1000).toLocaleTimeString()}</h4>
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
