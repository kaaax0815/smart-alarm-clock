import { defaultDatabase } from 'backend';
import { useEffect, useState } from 'react';

function useSettings() {
  const [loading, setLoading] = useState(true);
  const [locale, setLocale] = useState(defaultDatabase.locale);
  const [timezone, setTimezone] = useState(defaultDatabase.timezone);
  const [location, setLocation] = useState(defaultDatabase.location);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/settings`
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setLocale(data.locale);
      setTimezone(data.timezone);
      setLocation(data.location);
      setLoading(false);
    })();
  }, []);
  return { loading, locale, setLocale, timezone, setTimezone, location, setLocation };
}

export default useSettings;
