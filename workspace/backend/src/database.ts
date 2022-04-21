import { JsonDB } from 'node-json-db';

import { socketIO } from './index';
import { database } from './Models/database';

class CustomDB extends JsonDB {
  constructor(path: string) {
    super(path, true);
    this.initializeDatabase();
  }
  initializeDatabase() {
    try {
      if (super.getData('/initialized') === true) {
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
  push(dataPath: string, data: unknown, override?: boolean): void {
    super.push(dataPath, data, override);
    socketIO?.emitAll('databaseChange');
  }
  setTimezone(timezone: database['settings']['timezone']) {
    this.push('/settings/timezone', timezone);
  }
  setLocation(location: database['settings']['location']) {
    this.push('/settings/location', location);
  }
  addRingtone(ringtone: database['ringtones'][0]) {
    this.push('/ringtones', [ringtone], false);
  }
  deleteRingtone(ringtone: database['ringtones'][0]) {
    const oldRingtones = super.getData('/ringtones') as database['ringtones'];
    const newRingtones = oldRingtones.filter(
      (item) => item.name !== ringtone.name && item.location !== ringtone.location
    );
    this.push('/ringtones', newRingtones);
  }
  getRingtones() {
    return super.getData('/ringtones') as database['ringtones'];
  }
  getSettings() {
    return super.getData('/settings') as database['settings'];
  }
  getAlarms() {
    return super.getData('/alarms') as database['alarms'];
  }
  addAlarm(alarm: database['alarms'][0]) {
    this.push('/alarms', [alarm], false);
  }
  updateAlarm(alarm: Partial<database['alarms'][0]> & { name: string }) {
    const oldAlarms = this.getAlarms();
    const newAlarms = oldAlarms.map((item) => {
      if (item.name === alarm.name) {
        return { ...item, ...alarm };
      }
      return item;
    });
    this.push('/alarms', newAlarms);
  }
  deleteAlarm(alarm: { name: string }) {
    const oldAlarms = this.getAlarms();
    const newAlarms = oldAlarms.filter((item) => item.name !== alarm.name);
    this.push('/alarms', newAlarms);
  }
}

const db = new CustomDB('database');

export default db;
