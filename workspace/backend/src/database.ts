import { JsonDB } from 'node-json-db';

import { socketIO } from './index';

class CustomDB extends JsonDB {
  constructor(path: string) {
    super(path, true);
    this.initializeDatabase();
  }
  initializeDatabase() {
    try {
      if (this.getData('/initialized') === true) {
        return;
      }
    } catch {
      console.log('Database not initialized');
    }
    this.push('/timezone', 'Europe/Berlin');
    this.push('/location/city', 'Berlin');
    this.push('/location/countryCode', 'DE');
    this.push('/location/lat', 52.5170365);
    this.push('/location/lon', 13.3888599);
    this.push('/ringtones', [{ name: 'Alarm', location: '/ringtones/default.mp3' }]);
    this.push('/initialized', true);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  push(dataPath: string, data: any, override?: boolean): void {
    super.push(dataPath, data, override);
    socketIO?.emitAll('databaseChange');
  }
}

const db = new CustomDB('database');

export default db;
