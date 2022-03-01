import './index.css';

import useWeather from '../../hooks/useWeather';
import WeatherIcon from '../../icons/weather';
import { relativeHoursFromUnix } from '../../utils/date';

export default function Hourly() {
  const { data: weatherData, status: weatherStatus } = useWeather();
  if (weatherStatus !== 'success') {
    return <div>Loading...</div>;
  }
  return (
    <div className="Hourly">
      {weatherData!.hourly.slice(1, 25).map((hour) => (
        <div key={hour.dt}>
          {relativeHoursFromUnix(hour.dt)}
          <br />
          {hour.temp}°C
          <br />
          <WeatherIcon id={hour.weather[0].icon} />
          <br />
          {hour.pop}%
        </div>
      ))}
    </div>
  );
}
