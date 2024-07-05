import React, { useEffect, useState } from 'react';

const API_KEY = 'bqbDmfF5WJdMwepNzuuMZDtQwz7gNpcoPue08l2GAkJSKpsOcE05Jqn4';

function Forecast({ city, apiKey }) {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=it`);
        const data = await response.json();
        setForecastData(data.list);
      } catch (error) {
        console.error(`Errore durante il recupero dei dati: ${error.message}`);
      }
    };

    fetchForecastData();
  }, [city, apiKey]);

  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  // Funzione per raggruppare le previsioni per giorno
  const groupForecastByDay = () => {
    const dailyForecasts = {};
    forecastData.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = forecast;
      }
    });
    return Object.values(dailyForecasts);
  };

  // Ottieni le previsioni raggruppate per giorno
  const dailyForecasts = groupForecastByDay();

  return (
    <div className="forecast">
      <h3>Previsioni della settimana</h3>
      {dailyForecasts.map((forecast, index) => (
        <div key={index} className="forecast-day">
          <p>{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
          <img src={getWeatherIconUrl(forecast.weather[0].icon)} alt={forecast.weather[0].description} />
          <p>Temp: {forecast.main.temp}°C</p>
          <p>{forecast.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
}

export default Forecast;
