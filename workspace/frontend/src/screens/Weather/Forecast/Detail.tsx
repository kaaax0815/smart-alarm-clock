import { Grid } from '@mui/material';

import useWeather from '../../../hooks/useWeather';
import styles from './Detail.module.css';

export default function Detail({ selected }: { selected: number }) {
  const { data: weatherData, status: weatherStatus } = useWeather();
  if (weatherStatus !== 'success') {
    return <div>Lädt...</div>;
  }
  const day = weatherData!.daily![selected];
  return (
    <Grid container className={styles.Detail} justifyContent={'space-around'}>
      <Grid item xs={2}>
        <Grid container flexDirection={'column'} alignItems={'center'}>
          <div>{day.temp.morn}°C</div>
          <div>Morgens</div>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <Grid container flexDirection={'column'} alignItems={'center'}>
          <div>{day.temp.day}°C</div>
          <div>Mittags</div>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <Grid container flexDirection={'column'} alignItems={'center'}>
          <div>{day.temp.eve}°C</div>
          <div>Abends</div>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <Grid container flexDirection={'column'} alignItems={'center'}>
          <div>{day.temp.night}°C</div>
          <div>Nachts</div>
        </Grid>
      </Grid>
    </Grid>
  );
}
