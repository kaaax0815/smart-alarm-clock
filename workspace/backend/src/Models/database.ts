export const defaultDatabase = {
  settings: {
    timezone: 'Europe/Berlin',
    location: { city: 'Berlin', countryCode: 'DE', lat: 52.5170365, lon: 13.3888599 }
  },
  ringtones: [{ name: 'Alarm', location: '/ringtones/Alarm.mp3' }],
  initialized: true
};
export type database = typeof defaultDatabase;
