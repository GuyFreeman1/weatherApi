import './App.css';
import Search from './components/search/Search';
import CurrentWeather from './components/current-weather/CurrentWeather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './components/Api';
import { useState } from 'react';
import Forecast from './components/forecast/Forecast';

function App() {
  const [currentweather, setCurrentweather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
   const [lat, lon] = searchData.value.split(" ");

   const currentweatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
   const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

   Promise.all([currentweatherFetch, forecastFetch])
   .then(async (response) => {
    const weatherResponse = await response[0].json();
    const forecastResponse = await response[1].json();

    setCurrentweather({city: searchData.label, ...weatherResponse});
    setForecast({city: searchData.label, ...forecastResponse})
   })
   .catch((err) => console.log(err));


  }
  console.log(currentweather)
  console.log(forecast)
  
  return (
    <div className="container">
     <Search onSearchChange={handleOnSearchChange} />
     {currentweather && <CurrentWeather data={currentweather}/>}
     {forecast && <Forecast data={forecast}/>}
    </div>
  );
}

export default App;
