/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */
import { createContext } from 'react';

const settingsContext = createContext({
  shown: false,
  setShown: (shown: boolean) => {},
  locale: 'de-DE',
  setLocale: (locale: string) => {},
  timezone: 'Europe/Berlin',
  setTimezone: (timezone: string) => {}
});

export default settingsContext;
