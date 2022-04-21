import { database } from '../database';

export type deleteAlarmsRequest = { name: string };

export interface deleteAlarmsResponse {
  status: string;
  alarms?: database['alarms'];
}
