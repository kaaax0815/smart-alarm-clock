import { Grid } from '@mui/material';

import useWeather from '../../../hooks/useWeather';
import WeatherIcon from '../../../icons/weather';
import styles from './Current.module.css';

export default function Current() {
  const { data: weatherData, status: weatherStatus } = useWeather();
  if (weatherStatus !== 'success') {
    return <div>Lädt...</div>;
  }
  return (
    <Grid item xs={6} className={styles.current}>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <WeatherIcon id={weatherData!.current!.weather[0].icon} className={styles.WeatherIcon} />
        </Grid>
        <Grid item xs={6}>
          <Grid
            direction="column"
            container
            justifyContent="space-evenly"
            alignItems="flex-start"
            className={styles.text}
          >
            <Grid item xs={6} className={styles.temp}>
              {weatherData!.current!.temp}°C
            </Grid>
            <Grid item xs={6}>
              {weatherData!.current!.weather[0].description}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
