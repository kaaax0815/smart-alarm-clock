export const defaultDatabase = {
  locale: 'de-DE',
  timezone: 'Europe/Berlin',
  location: { city: 'Berlin', countryCode: 'DE', lat: 52.5170365, lon: 13.3888599 },
  initialized: true
};
export type database = typeof defaultDatabase;
