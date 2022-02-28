import { useQuery } from 'react-query';

import onecall from '../utils/onecall';
import useSettings from './useSettings';

function useWeather() {
  const { data: settingsData } = useSettings();
  return useQuery(
    'weather',
    () =>
      onecall(
        settingsData!.location.lat,
        settingsData!.location.lon,
        import.meta.env.VITE_OPEN_WEATHER_API_KEY
      ),
    {
      enabled: !!settingsData,
      staleTime: Infinity,
      refetchInterval: 1000 * 60 * 5
    }
  );
}

export default useWeather;
