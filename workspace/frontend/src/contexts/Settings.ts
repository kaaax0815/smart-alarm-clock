/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */
import { createContext } from 'react';

const settingsContext = createContext({
  locale: '',
  setLocale: (locale: string) => {},
  timezone: '',
  setTimezone: (timezone: string) => {},
  location: { city: '', state: '', countryCode: '' },
  setLocation: ({
    city,
    state,
    countryCode
  }: {
    city: string;
    state: string;
    countryCode: string;
  }) => {}
});

export default settingsContext;
