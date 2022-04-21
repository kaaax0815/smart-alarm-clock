import { database } from '../database';

export type postAlarmsRequest = database['alarms'][0];

export interface postAlarmsResponse {
  status: string;
  db?: database['alarms'];
}
