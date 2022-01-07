import { defaultDatabase } from 'backend';
import { useEffect, useState } from 'react';

import { getAPI, GetEndpoints } from '../utils/api';

function useSettings() {
  const [loading, setLoading] = useState(true);
  const [locale, setLocale] = useState(defaultDatabase.locale);
  const [timezone, setTimezone] = useState(defaultDatabase.timezone);
  const [location, setLocation] = useState(defaultDatabase.location);

  useEffect(() => {
    (async () => {
      const response = await getAPI(GetEndpoints.Settings);
      setLocale(response.locale);
      setTimezone(response.timezone);
      setLocation(response.location);
      setLoading(false);
    })();
  }, []);
  return { loading, locale, setLocale, timezone, setTimezone, location, setLocation };
}

export default useSettings;
