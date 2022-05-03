export function getAlarms() {
  return fetchData<Alarm[]>('/alarms');
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

export function getRingtones() {
  return fetchData<Ringtone[]>('/ringtones');
}

// Helper Function

async function fetchData<T>(endpoint: string) {
  const response = await fetch(`http://192.168.178.55:3535/api${endpoint}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const json = (await response.json()) as T;
  return json;
}

async function postData<Res>(endpoint: string, method: string, data: unknown) {
  const response = await fetch(`http://192.168.178.55:3535/api${endpoint}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const json = (await response.json()) as Res;
  return json;
}

// Typings
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

export interface Ringtone {
  /** Name of Ringtone */
  name: string;
  /** Location on the Sevrver */
  location: string;
}
