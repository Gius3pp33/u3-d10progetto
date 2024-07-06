import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import RainChart from './components/RainChart';
import Loading from './components/Loading';
import Error from './components/Error';
import Welcome from './components/Welcome';
import CityCards from './components/CityCards';
import Footer from './components/Footer';
import './App.css';
import NotFound from './components/NotFound';

const API_KEY = '1e3b33eb0c23931c8d2c3a6ad26d0a97';
const BackIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="#062026"
    className="bi bi-arrow-left"
    width={'40px'}
    height={'40px'}
  >
    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
  </svg>
);

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showBackIcon, setShowBackIcon] = useState(false);

  const fetchWeatherData = async (city) => {
    if (!city) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=it`);
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
        setShowBackIcon(true);
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
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]);

  const handleSearchBarChange = (inputValue) => {
    setCity(inputValue);
    setShowBackIcon(false);
  };

  const handleSearchBarSubmit = (inputValue) => {
    setCity(inputValue);
    setShowBackIcon(false);
  };

  return (
    <Router>
      <div className="app">
        <Welcome timeout={7000} />
        <SearchBar setCity={handleSearchBarChange} onSearch={handleSearchBarSubmit} />
        <Routes>
          <Route
            path="/weather"
            element={
              <>
                <div className="mb-3">
                  {showBackIcon && (
                    <Link to="/" className="btn btn-transparent text-white mb-4">
                      {BackIcon}
                    </Link>
                  )}
                </div>
                {loading && <Loading />}
                {error && <Error message={error} />}
                {weatherData && (
                  <>
                    <CityCards />
                    <CurrentWeather data={weatherData} />
                    <Forecast city={city} apiKey={API_KEY} />
                    <RainChart city={city} apiKey={API_KEY} />
                  </>
                )}
              </>
            }
          />
         
         {/* <Route path="*" element={<NotFound />} /> Il not found tolto per tornare indietro dopo aver cercato la città */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
