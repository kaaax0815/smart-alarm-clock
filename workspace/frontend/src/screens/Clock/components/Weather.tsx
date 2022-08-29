import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useWeather from '../../../hooks/useWeather';
import WeatherIcon from '../../../icons/weather';
import { relativeDaysFromUnix } from '../../../utils/date';
import styles from './Weather.module.css';

function Weather(): JSX.Element {
  const { data: weatherData, status: weatherStatus } = useWeather();
  const navigate = useNavigate();
  if (weatherStatus !== 'success') {
    return <CircularProgress color="inherit" />;
  }
  return (
    <div className={styles.Weather} onClick={() => navigate('/weather')}>
      {weatherData!.daily!.map((item) => (
        <div className={styles.WeatherCard} key={item.dt}>
          <div className="__Weather-Card-Date">{relativeDaysFromUnix(item.dt)}</div>
          <WeatherIcon
            id={item.weather[0].icon}
            className={styles.WeatherCardIcon}
            title={item.weather[0].description}
          />
          <div className="__Weather-Card-Temp">{Math.round(item.temp.day)}°C</div>
        </div>
      ))}
    </div>
  );
}

export default Weather;
