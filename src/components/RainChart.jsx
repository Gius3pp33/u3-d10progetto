import React, { useEffect, useState } from 'react';

const API_KEY = 'bqbDmfF5WJdMwepNzuuMZDtQwz7gNpcoPue08l2GAkJSKpsOcE05Jqn4';

function RainChart({ city, apiKey }) {
  const [rainData, setRainData] = useState([]);

  useEffect(() => {
    const fetchRainData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=it`);
        const data = await response.json();
        
        const formattedData = data.list.map(item => {
          const dateTime = new Date(item.dt * 1000);
          const hours = dateTime.getHours().toString().padStart(2, '0');
          const minutes = dateTime.getMinutes().toString().padStart(2, '0');
          return {
            time: `${hours}:${minutes}`,
            rain: item.rain ? item.rain['3h'] : 0,
            pop: item.pop * 100, // Converti la probabilità di precipitazioni in percentuale
          };
        });

        formattedData.sort((a, b) => a.timestamp - b.timestamp);
        setRainData(formattedData);
      } catch (error) {
        console.error('Errore durante il recupero dei dati:', error);
      }
    };

    fetchRainData();
  }, [city, apiKey]);

  const maxRain = Math.max(...rainData.map(item => item.rain), 0);
  const chartWidth = 500;
  const chartHeight = 300;

  // Calcoliamo i punti per le barre di percentuale di pioggia
  const bars = rainData.map((item, index) => {
    const x = (index / (rainData.length - 1)) * chartWidth;
    const height = (item.rain / maxRain) * chartHeight; // Altezza in base alla percentuale di pioggia
    return {
      x,
      height,
      rain: item.rain,
      pop: item.pop,
      time: item.time,
    };
  });

  return (
    <div className="rain-chart" style={{ position: 'relative', overflowX: 'auto', overflowY: 'hidden', padding: '10px' }}>
      <h3 style={{ textAlign: 'center' }}>Possibilità di Pioggia </h3>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', minHeight: `${chartHeight}px`, paddingBottom: '20px' }}>
        {bars.map((bar, index) => (
          <div key={index} style={{ margin: '0 10px', textAlign: 'center', position: 'relative' }}>
            <div style={{ marginBottom: '5px', height: `${bar.height}px`, backgroundColor: bar.rain > 0 ? 'blue' : 'lightgrey', width: '20px' }} />
            <div style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
              {bar.rain > 0 ? `${bar.rain}%` : `${bar.pop}% `}
            </div>
            <div>{bar.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RainChart;
