import { Exclude, OpenWeatherMap, Units } from 'owm-onecall-api';
import { useContext } from 'react';
import { useQuery } from 'react-query';

import SettingsContext from '../contexts/Settings';

const openWeather = new OpenWeatherMap(process.env.REACT_APP_OPEN_WEATHER_API_KEY!, {
  units: Units.Metric
});

function useWeather() {
  const { location } = useContext(SettingsContext);
  return useQuery(
    'weather',
    () =>
      openWeather.builder(location.lat, location.lon, { exclude: [Exclude.Minutely] }).execute(),
    { staleTime: Infinity, refetchInterval: 1000 * 60 * 5 }
  );
}

export default useWeather;
