import './Weather.css';
import 'moment/min/locales';

import { CircularProgress } from '@mui/material';
import moment from 'moment';
import { DailyDataBlock } from 'owm-onecall-api';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SettingsContext from '../../contexts/Settings';
import useWeather from '../../hooks/useWeather';

function Weather(): JSX.Element {
  const { data: weatherData, status: weatherStatus } = useWeather();
  const navigate = useNavigate();
  const settingsContext = useContext(SettingsContext);
  const [weather, setWeather] = useState<DailyDataBlock[] | Record<string, never>>({});
  useEffect(() => {
    if (weatherStatus === 'success') {
      setWeather(weatherData!.daily!);
    }
  }, [weatherData, weatherStatus]);
  moment.locale(settingsContext.locale);
  if (weatherStatus !== 'success') {
    return <CircularProgress color="inherit" />;
  }
  return (
    <div className="__Weather" onClick={() => navigate('/weather')}>
      {weather.map((item) => (
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
