import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const WeatherIcon = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`
      );

      console.log(response);
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

  return <div>WeatherIcon</div>;
};

export default WeatherIcon;
