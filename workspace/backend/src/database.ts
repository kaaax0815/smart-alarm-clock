import { JsonDB } from 'node-json-db';

import { socketIO } from './index';
import { database } from './Models/database';

class CustomDB extends JsonDB {
  constructor(path: string) {
    super(path, true);
    this.initializeDatabase();
  }
  private initializeDatabase() {
    try {
      if (this.getData('/initialized') === true) {
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
    this._push('/initialized', true);
  }
  /**
   * Does nothing
   * Use typed methods to update database
   */
  push() {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _push(dataPath: string, data: any, override?: boolean): void {
    super.push(dataPath, data, override);
    socketIO?.emitAll('databaseChange');
  }
  setTimezone(timezone: database['settings']['timezone']) {
    this._push('/settings/timezone', timezone);
  }
  setLocation(location: database['settings']['location']) {
    this._push('/settings/location', location);
  }
  addRingtone(ringtone: database['ringtones'][0]) {
    this._push('/ringtones', [ringtone], true);
  }
  deleteRingtone(ringtone: database['ringtones'][0]) {
    const oldRingtones = this.getData('/ringtones') as database['ringtones'];
    const newRingtones = oldRingtones.filter(
      (item) => item.name !== ringtone.name && item.location !== ringtone.location
    );
    this._push('/ringtones', newRingtones, false);
  }
}

const db = new CustomDB('database');

export default db;
