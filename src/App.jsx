import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import RainChart from './components/RainChart';
import GlobalMap from './components/GlobalMap';
import './App.css';

const API_KEY = '1e3b33eb0c23931c8d2c3a6ad26d0a97';

function App() {
  const [city, setCity] = useState('Seattle, Australia');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=it`);
    const data = await response.json();
    setWeatherData(data);
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  return (
    <div className="app">
      <SearchBar setCity={setCity} />
      {weatherData && (
        <>
          <CurrentWeather data={weatherData} />
          <Forecast city={city} apiKey={API_KEY} />
          <RainChart city={city} apiKey={API_KEY} />
          <GlobalMap />
        </>
      )}
    </div>
  );
}

export default App;
