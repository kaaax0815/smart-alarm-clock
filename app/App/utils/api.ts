import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';
import { DocumentPickerResponse } from 'react-native-document-picker';

export async function getAlarms() {
  const result = await fetchData<{ alarms: Alarm[] }>('/alarms');
  return result.alarms;
}

export function postAlarms(alarm: Alarm) {
  return postData('/alarms', 'POST', alarm);
}

export function deleteAlarms(alarm: Pick<Alarm, 'name'>) {
  return postData('/alarms', 'DELETE', alarm);
}

export function patchAlarms(alarm: Partial<Alarm> & { name: string }) {
  return postData('/alarms', 'PATCH', alarm);
}

export async function getRingtones() {
  const result = await fetchData<{ ringtones: Ringtone[] }>('/ringtones');
  return result.ringtones;
}

export async function deleteRingtones(ringtone: Pick<Ringtone, 'name'>) {
  return postData('/ringtones', 'DELETE', ringtone);
}

// Helper Function

// TODO: Dynamic IP

async function fetchData<T>(endpoint: string) {
  const response = await fetch(`http://192.168.178.55:3535/api${endpoint}`);
  if (!response.ok) {
    console.warn(
      'API:',
      'Failed to fetch data from API',
      endpoint,
      response.status,
      response.statusText,
    );
    throw new Error(response.statusText);
  }
  const json = (await response.json()) as Response<T>;
  if (json.status === 'error') {
    console.warn(
      'API:',
      'Error while fetching data from API',
      endpoint,
      json.error.message,
    );
    throw new Error(json.error.message);
  }
  return json.data;
}

async function postData<T>(endpoint: string, method: string, data: unknown) {
  const response = await fetch(`http://192.168.178.55:3535/api${endpoint}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    console.warn(
      'API:',
      'Failed to post data to API',
      endpoint,
      method,
      response.status,
      response.statusText,
    );
    throw new Error(response.statusText);
  }
  const json = (await response.json()) as Response<T>;
  if (json.status === 'error') {
    console.warn(
      'API:',
      'Error while posting data to API',
      endpoint,
      method,
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

export async function postRingtone(values: {
  name: string;
  ringtone: DocumentPickerResponse;
}) {
  values.name = values.name + '.mp3';
  const formData = new FormData();
  formData.append('ringtone', {
    name: values.ringtone.name,
    type: values.ringtone.type,
    uri: values.ringtone.uri,
  });
  const res = await fetch('http:///10.0.2.2:3535/api/ringtones', {
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
  const responseJson = await res.json();
  console.log(responseJson);
}
