import { Grid } from '@mui/material';

import useSettings from '../../../hooks/useSettings';
import useWeather from '../../../hooks/useWeather';
import { formatFromUnix } from '../../../utils/date';
import styles from './Details.module.css';

export default function Details() {
  const { data: weatherData, status: weatherStatus } = useWeather();
  const { data: settingsData, status: settingsStatus } = useSettings();
  if (weatherStatus !== 'success' || settingsStatus !== 'success') {
    return <div>Lädt...</div>;
  }
  return (
    <Grid item xs={6} className={styles.details}>
      <Grid container alignContent="space-around">
        <Grid item xs={4}>
          <Grid container direction="column">
            <Grid item xs={6}>
              {weatherData!.daily![0].temp.max}°C
            </Grid>
            <Grid item xs={6}>
              Höchst
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="column">
            <Grid item xs={6}>
              {(weatherData!.current!.wind_speed * 3.6).toFixed(1)}km/h
            </Grid>
            <Grid item xs={6}>
              Wind
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="column">
            <Grid item xs={6}>
              {formatFromUnix(weatherData!.current!.sunrise, settingsData!.timezone, 'HH:mm')}
            </Grid>
            <Grid item xs={6}>
              Sonnenaufgang
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="column">
            <Grid item xs={6}>
              {weatherData!.daily![0].temp.min}°C
            </Grid>
            <Grid item xs={6}>
              Tiefst
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="column">
            <Grid item xs={6}>
              {weatherData!.daily![0].pop}%
            </Grid>
            <Grid item xs={6}>
              Regen
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="column">
            <Grid item xs={6}>
              {formatFromUnix(weatherData!.current!.sunset, settingsData!.timezone, 'HH:mm')}
            </Grid>
            <Grid item xs={6}>
              Sonnenuntergang
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
