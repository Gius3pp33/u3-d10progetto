import React, { useEffect, useState } from 'react';
import Loading from './Loading'; // Assicurati che il percorso sia corretto
import { Card, Carousel, Col, Container, Row } from 'react-bootstrap';
import '../components/CityCards.css';

const API_KEY = '1e3b33eb0c23931c8d2c3a6ad26d0a97';

const CityCard = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=it`);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error(`Errore durante il recupero dei dati di ${city}: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  if (loading) {
    return <Loading />;
  }

  if (!weatherData) {
    return null; 
  }

  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;

  return (
    <Col sm={6} md={4} lg={3} xl={2} className="mb-4">
      <Card className="city-card" style={{ borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        <Card.Body className="text-center">
          <Card.Title style={{ fontSize: '20px', marginBottom: '10px' }}>{weatherData.name}</Card.Title>
          <Card.Img variant="top" src={weatherIconUrl} alt={weatherData.weather[0].description} style={{ width: '50px', height: '50px', margin: '0 auto 10px' }} />
          <Card.Text>Temp: {weatherData.main.temp}°C</Card.Text>
          <Card.Text>{weatherData.weather[0].description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

const CityCards = () => {
  const cities = [
    'London', 'Paris', 'New York', 'Tokyo', 'Sydney', 'Catania', 'Roma', 'Lisbona', 'Oslo', 'Berlino', 'Marocco',
    'Madrid', 'Amsterdam', 'Vienna', 'Dubai', 'Moscow', 'Seoul', 'Beijing', 'Bangkok', 'Singapore', 'Hong Kong',
    'Los Angeles', 'San Francisco', 'Toronto', 'Vancouver', 'Montreal', 'Mexico City', 'Buenos Aires', 'Rio de Janeiro',
    'Sao Paulo', 'Cairo', 'Johannesburg', 'Cape Town', 'Dublin', 'Brussels', 'Zurich', 'Stockholm', 'Warsaw', 'Prague',
    'Budapest', 'Athens', 'Rome', 'Milan', 'Munich', 'Berlin', 'Helsinki', 'Oslo', 'Copenhagen', 'Lisbon'
  ];


  const itemsPerSlide = 4; 

  const getSlides = () => {
    const slides = [];
    for (let i = 0; i < cities.length; i += itemsPerSlide) {
      slides.push(
        <Carousel.Item key={i}>
          <Row className="justify-content-around">
            {cities.slice(i, i + itemsPerSlide).map((city, index) => (
              <CityCard key={index} city={city} />
            ))}
          </Row>
        </Carousel.Item>
      );
    }
    return slides;
  };

  return (
    <Container fluid className="city-cards">
      <Carousel indicators={false} controls={false} >
        {getSlides()}
      </Carousel>
    </Container>
  );
};
export default CityCards;
