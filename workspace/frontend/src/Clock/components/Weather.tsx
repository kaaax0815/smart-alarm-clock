import './Weather.css';
import 'moment/min/locales';

import { CircularProgress } from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import useSettings from '../../hooks/useSettings';
import useWeather from '../../hooks/useWeather';

function Weather(): JSX.Element {
  const { data: weatherData, status: weatherStatus } = useWeather();
  const navigate = useNavigate();
  const { data: settingsData, status: settingsStatus } = useSettings();
  moment.locale(settingsData!.locale);
  if (weatherStatus !== 'success' || settingsStatus !== 'success') {
    return <CircularProgress color="inherit" />;
  }
  return (
    <div className="__Weather" onClick={() => navigate('/weather')}>
      {weatherData!.daily!.map((item) => (
        <div className="__Weather-Card" key={item.dt}>
          <div className="__Weather-Card-Date">{moment.unix(item.dt).calendar().split(' ')[0]}</div>
          <img
            className="__Weather-Card-Icon"
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
            alt={item.weather[0].description}
          />
          <div className="__Weather-Card-Temp">{Math.round(item.temp.day)}°C</div>
        </div>
      ))}
    </div>
  );
}

export default Weather;
