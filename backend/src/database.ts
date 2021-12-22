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
  db.push('/initialized', true);
}

export default db;
