import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';
import { citiesData } from '../data/citiesData';
import { processData } from '../constants/helper';
import { getCityCodes, generateUrl } from '../constants/apiHelper';

const WeatherInfo = () => {
  console.log('Component rendering!');

  const [weatherCards, setWeatherCards] = useState([]);

  const fetchWeatherData = async () => {
    if (weatherCards.length > 0) {
      return weatherCards; // Return cached data if available
    }

    const cityCodes = getCityCodes(citiesData);
    const url = generateUrl(cityCodes);

    // If no cached data, proceed with API call !
    try {
      const response = await fetch(url);
      const weatherData = await response.json();
      const cards = processData(weatherData, citiesData);
      setWeatherCards(cards); // Cache the fetched data
      return cards;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return [];
    }
  };

  useEffect(() => {
    console.log('Component is unmounting or condition changed!');
    fetchWeatherData().then(cards => {
      const weatherContainer = document.getElementById('weather-container');
      ReactDOM.render(cards, weatherContainer);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div id="weather-container"></div>
    </div>
  );
};

export default WeatherInfo;
