import { JsonDB } from 'node-json-db';

const db = new JsonDB('database', true);
initializeDatabase();

function initializeDatabase() {
  try {
    if (db.getData('/initialized') === true) {
      return;
    }
  } catch {
    console.log('Database not initialized');
  }
  db.push('/locale', 'de-DE');
  db.push('/timezone', 'Europe/Berlin');
  db.push('/location/city', 'Berlin');
  db.push('/location/countryCode', 'DE');
  db.push('/location/lat', 52.5170365);
  db.push('/location/lon', 13.3888599);
  db.push('/initialized', true);
}

export default db;
