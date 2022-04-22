import { useQuery } from 'react-query';

import { getAlarms } from '../utils/api';

export function useAlarms() {
  return useQuery<Alarm[]>('alarms', () => getAlarms());
}

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
