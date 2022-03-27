import useSettings from '../../hooks/useSettings';
import useWeather from '../../hooks/useWeather';
import WeatherIcon from '../../icons/weather';
import { formatFromUnix } from '../../utils/date';
import styles from './index.module.css';

export default function Hourly() {
  const { data: weatherData, status: weatherStatus } = useWeather();
  const { data: settingsData, status: settingsStatus } = useSettings();
  if (weatherStatus !== 'success' || settingsStatus !== 'success') {
    return <div>Lädt...</div>;
  }
  return (
    <div className={styles.Hourly}>
      {weatherData!.hourly!.slice(1, 25).map((hour) => (
        <div key={hour.dt}>
          {formatFromUnix(hour.dt, settingsData!.timezone, 'HH:mm')}
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
