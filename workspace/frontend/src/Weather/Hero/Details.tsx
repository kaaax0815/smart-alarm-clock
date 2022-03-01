import { Grid } from '@mui/material';

import useWeather from '../../hooks/useWeather';
import { formatFromUnix } from '../../utils/date';

export default function Details() {
  const { data: weatherData, status: weatherStatus } = useWeather();
  if (weatherStatus !== 'success') {
    return <div>Loading...</div>;
  }
  return (
    <Grid item xs={6}>
      <Grid container alignContent="space-around">
        <Grid item xs={4}>
          <Grid container direction="column">
            <Grid item xs={6}>
              {weatherData!.daily[0].temp.max}°C
            </Grid>
            <Grid item xs={6}>
              High
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="column">
            <Grid item xs={6}>
              {weatherData!.current.wind_speed * 3.6}km/h
            </Grid>
            <Grid item xs={6}>
              Wind
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="column">
            <Grid item xs={6}>
              {formatFromUnix(weatherData!.daily[0].sunrise, 'HH:mm')}
            </Grid>
            <Grid item xs={6}>
              Sunrise
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="column">
            <Grid item xs={6}>
              {weatherData!.daily[0].temp.min}°C
            </Grid>
            <Grid item xs={6}>
              Low
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="column">
            <Grid item xs={6}>
              {weatherData!.daily[0].pop}%
            </Grid>
            <Grid item xs={6}>
              Rain
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="column">
            <Grid item xs={6}>
              {formatFromUnix(weatherData!.daily[0].sunset, 'HH:mm')}
            </Grid>
            <Grid item xs={6}>
              Sunset
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
