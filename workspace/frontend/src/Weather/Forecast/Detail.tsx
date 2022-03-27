import useWeather from '../../hooks/useWeather';
import styles from './Detail.module.css';

export default function Detail({ selected }: { selected: number }) {
  const { data: weatherData, status: weatherStatus } = useWeather();
  if (weatherStatus !== 'success') {
    return <div>Lädt...</div>;
  }
  const day = weatherData!.daily![selected];
  return (
    <div className={styles.Detail}>
      <div>Morgens: {day.temp.morn}°C</div>
      <div>Mittags: {day.temp.day}°C</div>
      <div>Abends: {day.temp.eve}°C</div>
      <div>Nachts: {day.temp.night}°C</div>
    </div>
  );
}
