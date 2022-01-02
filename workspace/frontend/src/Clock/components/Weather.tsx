import './Weather.css';
import 'moment/min/locales';

import { CircularProgress } from '@mui/material';
import moment from 'moment';
import { DailyDataBlock, OpenWeatherMap, Units } from 'owm-onecall-api';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SettingsContext from '../../contexts/Settings';

function Weather(): JSX.Element {
  const navigate = useNavigate();
  const settingsContext = useContext(SettingsContext);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<DailyDataBlock[] | Record<string, never>>({});
  useEffect(() => {
    const openWeather = new OpenWeatherMap(process.env.REACT_APP_OPEN_WEATHER_API_KEY!, {
      units: Units.Metric
    });
    openWeather.week(settingsContext.location.lat, settingsContext.location.lon).then((data) => {
      setWeather(data.daily);
      setLoading(false);
    });
  }, [settingsContext.location]);
  moment.locale(settingsContext.locale);
  if (loading) {
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
