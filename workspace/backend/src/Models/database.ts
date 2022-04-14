export const defaultDatabase = {
  settings: {
    timezone: 'Europe/Berlin',
    location: { city: 'Berlin', countryCode: 'DE', lat: 52.5170365, lon: 13.3888599 }
  },
  ringtones: [{ name: 'Alarm', location: '/ringtones/Alarm.mp3' }],
  initialized: true
};

export interface Alarm {
  /** Name of a Ringtone in `ringtones` */
  ringtone: string;
  /** Time when the alarm should go off in timezone in `settings.timezone` */
  time: string;
  /** On which days it should go off
   * 1 = Monday, 2 = Tuesday, ..., 7 = Sunday
   */
  days: number[];
  /** Whether the alarm is enabled or not */
  enabled: boolean;
  /** Name of the Alarm for quick access */
  name: string;
}

export type database = typeof defaultDatabase & { alarms: Alarm[] };
