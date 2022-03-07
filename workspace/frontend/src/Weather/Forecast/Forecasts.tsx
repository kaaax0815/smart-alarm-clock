import useWeather from '../../hooks/useWeather';
import WeatherIcon from '../../icons/weather';
import { relativeDaysFromUnix } from '../../utils/date';
import styles from './Forecasts.module.css';

export default function Forecasts({
  selected,
  setSelected
}: {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { data: weatherData, status: weatherStatus } = useWeather();
  if (weatherStatus !== 'success') {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.Forecasts}>
      {weatherData!.daily!.map((day, index) => (
        <div
          key={day.dt}
          onClick={() => setSelected(index)}
          data-selected={index == selected ? true : false}
        >
          {relativeDaysFromUnix(day.dt)}
          <br />
          {day.temp.min}°C - {day.temp.max}°C
          <br />
          <WeatherIcon id={day.weather[0].icon} />
          <br />
          {day.pop}%
          <br />
        </div>
      ))}
    </div>
  );
}
