import { Config, JsonDB } from 'node-json-db';

import { socketIO } from './index';
import { database } from './Models/database';

class CustomDB extends JsonDB {
  constructor(path: string) {
    super(new Config(path, true));
    this.initializeDatabase();
  }
  async initializeDatabase() {
    try {
      const initialized = await super.getData('/initialized');
      if (initialized === true) {
        return;
      }
    } catch {
      console.log('Database not initialized');
    }
    this.setTimezone('Europe/Berlin');
    this.setLocation({
      city: 'Berlin',
      countryCode: 'DE',
      lat: 52.5170365,
      lon: 13.3888599
    });
    this.addRingtone({ name: 'Alarm', location: '/ringtones/Alarm.mp3' });
    this.push('/alarms', []);
    this.push('/initialized', true);
  }
  async push(dataPath: string, data: unknown, override?: boolean): Promise<void> {
    await super.push(dataPath, data, override);
    socketIO?.emitAll('databaseChange');
  }
  setTimezone(timezone: database['settings']['timezone']) {
    return this.push('/settings/timezone', timezone);
  }
  setLocation(location: database['settings']['location']) {
    return this.push('/settings/location', location);
  }
  addRingtone(ringtone: database['ringtones'][0]) {
    return this.push('/ringtones', [ringtone], false);
  }
  async deleteRingtone(ringtone: { name: string }) {
    const oldRingtones = (await super.getData('/ringtones')) as database['ringtones'];
    const newRingtones = oldRingtones.filter((item) => item.name !== ringtone.name);
    return this.push('/ringtones', newRingtones);
  }
  getRingtones() {
    return super.getData('/ringtones') as Promise<database['ringtones']>;
  }
  getSettings() {
    return super.getData('/settings') as Promise<database['settings']>;
  }
  getAlarms() {
    return super.getData('/alarms') as Promise<database['alarms']>;
  }
  addAlarm(alarm: database['alarms'][0]) {
    return this.push('/alarms', [alarm], false);
  }
  async updateAlarm(alarm: Partial<database['alarms'][0]> & { name: string }) {
    const oldAlarms = await this.getAlarms();
    const newAlarms = oldAlarms.map((item) => {
      if (item.name === alarm.name) {
        return { ...item, ...alarm };
      }
      return item;
    });
    return this.push('/alarms', newAlarms);
  }
  async deleteAlarm(alarm: { name: string }) {
    const oldAlarms = await this.getAlarms();
    const newAlarms = oldAlarms.filter((item) => item.name !== alarm.name);
    return this.push('/alarms', newAlarms);
  }
}

const db = new CustomDB('database');

export default db;
