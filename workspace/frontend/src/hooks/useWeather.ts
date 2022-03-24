import { Exclude, Language, OpenWeatherMap, Units } from 'owm-onecall-api';
import { useQuery } from 'react-query';

import useSettings from './useSettings';

const openWeather = new OpenWeatherMap(import.meta.env.VITE_OPEN_WEATHER_API_KEY, {
  units: Units.Metric
});

function useWeather() {
  const { data: settingsData } = useSettings();
  return useQuery(
    'weather',
    () =>
      openWeather
        .builder(settingsData!.location.lat, settingsData!.location.lon)
        .exclude(Exclude.Minutely)
        .language(Language.German)
        .execute(),
    {
      enabled: !!settingsData,
      staleTime: Infinity,
      refetchInterval: 1000 * 60 * 5
    }
  );
}

export default useWeather;
