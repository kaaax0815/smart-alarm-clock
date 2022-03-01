import './Weather.css';

import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useWeather from '../../hooks/useWeather';
import WeatherIcon from '../../icons/weather';
import { relativeDaysFromUnix } from '../../utils/date';

function Weather(): JSX.Element {
  const { data: weatherData, status: weatherStatus } = useWeather();
  const navigate = useNavigate();
  if (weatherStatus !== 'success') {
    return <CircularProgress color="inherit" />;
  }
  return (
    <div className="__Weather" onClick={() => navigate('/weather')}>
      {weatherData!.daily!.map((item) => (
        <div className="__Weather-Card" key={item.dt}>
          <div className="__Weather-Card-Date">{relativeDaysFromUnix(item.dt)}</div>
          <WeatherIcon
            id={item.weather[0].icon}
            className="__Weather-Card-Icon"
            title={item.weather[0].description}
          />
          <div className="__Weather-Card-Temp">{Math.round(item.temp.day)}°C</div>
        </div>
      ))}
    </div>
  );
}

export default Weather;
