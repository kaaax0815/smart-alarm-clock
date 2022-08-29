import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';
import { DocumentPickerResponse } from 'react-native-document-picker';

import fetch from './fetch';

export async function getAlarms(ip: string) {
  const result = await fetchData<{ alarms: Alarm[] }>(ip, '/alarms');
  return result.alarms;
}

export function postAlarms(ip: string, alarm: Alarm) {
  return postData(ip, '/alarms', 'POST', alarm);
}

export function deleteAlarms(ip: string, alarm: Pick<Alarm, 'name'>) {
  return postData(ip, '/alarms', 'DELETE', alarm);
}

export function patchAlarms(
  ip: string,
  alarm: Partial<Alarm> & { name: string },
) {
  return postData(ip, '/alarms', 'PATCH', alarm);
}

export async function getRingtones(ip: string) {
  const result = await fetchData<{ ringtones: Ringtone[] }>(ip, '/ringtones');
  return result.ringtones;
}

export function deleteRingtones(ip: string, ringtone: Pick<Ringtone, 'name'>) {
  return postData(ip, '/ringtones', 'DELETE', ringtone);
}

export async function getSettings(ip: string) {
  const result = await fetchData<{ settings: Settings }>(ip, '/settings');
  return result.settings;
}

export async function postSettings(ip: string, settings: PostSettings) {
  return postData(ip, '/settings', 'POST', settings);
}

// Helper Function

async function fetchData<T>(ip: string, endpoint: string) {
  const response = await fetch(`http://${ip}:3535/api${endpoint}`);
  const json = (await response.json()) as Response<T>;
  if (json.status === 'error') {
    console.warn(
      'API:',
      'Failed to fetch data from API',
      endpoint,
      response.status,
      response.statusText,
      json.error.message,
    );
    throw new Error(json.error.message);
  }
  return json.data;
}

async function postData<T>(
  ip: string,
  endpoint: string,
  method: string,
  data: unknown,
) {
  const response = await fetch(`http://${ip}:3535/api${endpoint}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const json = (await response.json()) as Response<T>;
  if (json.status === 'error') {
    console.warn(
      'API:',
      'Failed to fetch data from API',
      endpoint,
      response.status,
      response.statusText,
      json.error.message,
    );
    throw new Error(json.error.message);
  }
  return json.data;
}

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(state.isConnected ?? undefined);
  });
});

export interface ResponseError {
  status: 'error';
  error: { message: string };
}

export interface ResponseSuccess<T> {
  status: 'success';
  data: T;
}

export type Response<T> = ResponseError | ResponseSuccess<T>;

// Typings
export interface Alarm {
  /** Name of a Ringtone in `ringtones` */
  ringtone: string;
  /** Time when the alarm should go off in timezone in `settings.timezone` */
  time: string;
  /** On which days it should go off
   * 0 = Monday
   * If true then the alarm should go off on that day
   */
  days: boolean[];
  /** Whether the alarm is enabled or not */
  enabled: boolean;
  /** Name of the Alarm for quick access */
  name: string;
}

export interface Ringtone {
  /** Name of Ringtone */
  name: string;
  /** Location on the Server */
  location: string;
}

export interface Settings {
  timezone: string;
  location: {
    city: string;
    countryCode: string;
    lat: number;
    lon: number;
  };
}

export type PostSettings = Partial<Pick<Settings, 'timezone'>> &
  Partial<Pick2<Settings, 'location', 'city' | 'countryCode'>>;

export async function postRingtone(
  ip: string,
  values: {
    name: string;
    ringtone: DocumentPickerResponse;
  },
) {
  values.name = values.name + '.mp3';
  const formData = new FormData();
  formData.append('ringtone', {
    name: values.name,
    type: values.ringtone.type,
    uri: values.ringtone.uri,
  });
  const res = await fetch(`http:///${ip}:3535/api/ringtones`, {
    method: 'post',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (!res.ok) {
    console.warn(
      'API:',
      'Failed to post ringtone to API',
      res.status,
      res.statusText,
    );
    throw new Error(res.statusText);
  }
}

type Pick2<T, K1 extends keyof T, K2 extends keyof T[K1]> = {
  [P1 in K1]: {
    [P2 in K2]: T[K1][P2];
  };
};
