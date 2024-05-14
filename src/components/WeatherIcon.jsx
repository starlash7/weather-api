import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import {
  WiCloud,
  WiDaySunny,
  WiDayCloudy,
  WiCloudyGusts,
  WiRain,
  WiRainMix,
  WiLightning,
  WiFog,
  WiSnowflakeCold,
} from "react-icons/wi";

const wetherIcons = {
  "01": <WiCloud size={32} />,
  "02": <WiDaySunny size={32} />,
  "03": <WiDayCloudy size={32} />,
  "04": <WiCloudyGusts size={32} />,
  "09": <WiRain size={32} />,
  10: <WiRainMix size={32} />,
  11: <WiLightning size={32} />,
  13: <WiFog size={32} />,
  50: <WiSnowflakeCold size={32} />,
};

const WeatherIcon = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [weatherData, setWeatherData] = useState();

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`
      );

      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (!latitude) return;

    getWeather();
  }, [latitude]);

  useEffect(() => {
    if (!weatherData) return;

    console.log(weatherData.weather[0].icon.substring(0, 2));
  }, [weatherData]);

  if (!weatherData) return <div>loading...</div>;

  return (
    <div className="text-xs flex items-center">
      {wetherIcons[weatherData.weather[0].icon.substring(0, 2)]}
      <div className="w-16">
        <div className="font-semibold">{weatherData.name}</div>
        <div>{weatherData.main.temp.toFixed(1)}℃</div>
      </div>
    </div>
  );
};

export default WeatherIcon;
