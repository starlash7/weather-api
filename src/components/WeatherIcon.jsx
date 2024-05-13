import { useState } from "react";
import { useEffect } from "react";

const WeatherIcon = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongtude] = useState();

  navigator.geolocation.getCurrentPosition((position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  });
  return <div>WeatherIcon</div>;
};

export default WeatherIcon;
