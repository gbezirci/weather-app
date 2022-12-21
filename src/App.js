import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import useGeolocation from 'react-hook-geolocation';
import styled from 'styled-components';
import WeatherComponent from './components/WeatherComponent';

export const WeatherIcons = {
  '01d': '/icons/sunny.svg',
  '01n': '/icons/night.svg',
  '02d': '/icons/day.svg',
  '02n': '/icons/cloudy-night.svg',
  '03d': '/icons/cloudy.svg',
  '03n': '/icons/cloudy.svg',
  '04d': '/icons/perfect-day.svg',
  '04n': '/icons/cloudy-night.svg',
  '09d': '/icons/rain.svg',
  '09n': '/icons/rain-night.svg',
  '10d': '/icons/rain.svg',
  '10n': '/icons/rain-night.svg',
  '11d': '/icons/storm.svg',
  '11n': '/icons/storm.svg',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  padding: 20px 10px;
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 #555;
  background: white;
  font-family: Montserrat;
`;

const AppLabel = styled.span`
  color: black;
  margin: 20px auto;
  font-size: 18px;
  font-weight: bold;
`;

const SearchBox = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 20px;
  border: black solid 1px;
  border-radius: 2px;

  & input {
    padding: 10px;
    font-size: 14px;
    border: none;
    outline: none;
    font-family: Montserrat;
    font-weight: bold;
  }
  & button {
    background-color: black;
    font-size: 14px;
    padding: 0 10px;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
    font-family: Montserrat;
    font-weight: bold;
  }
`;

function App() {
  const [city, updateCity] = useState();
  const [weatherData, setWeather] = useState();
  const geolocation = useGeolocation();

  const getWeatherData = async (lat, lan) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lan}&lang=tr&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
    console.log(response.data);
    setWeather(response.data);
  };

  const getWeatherDataByCityName = async () => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=tr&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
    console.log(response.data);
    setWeather(response.data);
  };

  useEffect(() => {
    geolocation.latitude && geolocation.longitude && getWeatherData(geolocation.latitude, geolocation.longitude);
  }, [geolocation.latitude, geolocation.longitude]);

  // useEffect(() => {
  //   getWeatherData(39.878656, 32.6631424);
  // }, []);

  return (
    <Container>
      <AppLabel>Weather App</AppLabel>
      <SearchBox>
        <input onChange={(e) => updateCity(e.target.value)} placeholder="City" />
        <button type={'button'} onClick={getWeatherDataByCityName}>Search</button>
      </SearchBox>
      {weatherData ? <WeatherComponent weather={weatherData}></WeatherComponent> : <AppLabel>Hava Bilgisi Bekleniyor...</AppLabel>}
    </Container>
  );
}

export default App;
