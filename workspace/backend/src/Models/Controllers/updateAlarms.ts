import { database } from '../database';

export type updateAlarmsRequest = Partial<database['alarms'][0]> & { name: string };

export interface updateAlarmsResponse {
  status: string;
  alarm?: database['alarms'][0];
}
