import useWeather from '../../hooks/useWeather';
import styles from './Detail.module.css';

export default function Detail({ selected }: { selected: number }) {
  const { data: weatherData, status: weatherStatus } = useWeather();
  if (weatherStatus !== 'success') {
    return <div>Loading...</div>;
  }
  const day = weatherData!.daily[selected];
  return (
    <div className={styles.Detail}>
      <div>Morning: {day.temp.morn}°C</div>
      <div>Day: {day.temp.day}°C</div>
      <div>Evening: {day.temp.eve}°C</div>
      <div>Night: {day.temp.night}°C</div>
    </div>
  );
}
