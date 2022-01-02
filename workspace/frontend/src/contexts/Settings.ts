/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */
import { createContext } from 'react';

const settingsContext = createContext({
  locale: '',
  setLocale: (locale: string) => {},
  timezone: '',
  setTimezone: (timezone: string) => {},
  location: { city: '', countryCode: '', lat: 0, lon: 0 },
  setLocation: ({
    city,
    countryCode,
    lat,
    lon
  }: {
    city: string;
    countryCode: string;
    lat: number;
    lon: number;
  }) => {}
});

export default settingsContext;
