import { database } from '../database';

export type patchAlarmsRequest = Partial<database['alarms'][0]> & { name: string };

export interface patchAlarmsResponse {
  status: string;
  alarm?: database['alarms'][0];
}
