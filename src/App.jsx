import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import RainChart from './components/RainChart';
import Loading from './components/Loading';
import Error from './components/Error';
import Welcome from './components/Welcome';
import CityCards from './components/CityCards';

import './App.css';
import Footer from './components/Footer';

const API_KEY = '1e3b33eb0c23931c8d2c3a6ad26d0a97';

function App() {
  const [city, setCity] = useState('Catania');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=it`);
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(`Errore durante il recupero dei dati: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  return (
    <div className="app">
      <Welcome timeout={5000}  />
      <SearchBar setCity={setCity} />
      {loading && <Loading />}
      {error && <Error message={error} />}
      {weatherData && (
        <>
         <CityCards />
          <CurrentWeather data={weatherData} />
          <Forecast city={city} apiKey={API_KEY} />
          <RainChart city={city} apiKey={API_KEY} />
         <Footer />
        </>
      )}
    </div>
  );
}

export default App;
