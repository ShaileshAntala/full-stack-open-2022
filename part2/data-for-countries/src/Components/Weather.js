import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ capital, lat, lng }) => {
  const [weatherInfo, setWeatherInfo] = useState({});
  const { main = {}, wind = {}, weather = [] } = weatherInfo;

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_WEATHER_API}/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
      )
      .then((response) => setWeatherInfo(response.data));
  }, [lat, lng]);

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature {main?.temp} Celcius</p>
      {weather[0]?.icon && (
        <img
          src={` http://openweathermap.org/img/wn/${weather[0]?.icon}@2x.png`}
          alt={weather[0]?.main}
        />
      )}
      <p>wind {wind?.speed} m/s</p>
    </div>
  );
};

export default Weather;
