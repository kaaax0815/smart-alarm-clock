import db from '../database';
import { stopServer } from '../index';
import { defaultDatabase } from '../Models/database';

afterAll(async () => {
  await stopServer();
});

describe('database', () => {
  it('should reset database', () => {
    db.resetData({});
    const data = db.getData('/');
    expect(data).toEqual({});
  });
  it('should initialize data', () => {
    db.initializeDatabase();
    const data = db.getData('/');
    expect(data).toEqual(defaultDatabase);
  });
  it('should set settings', () => {
    db.setTimezone('1');
    db.setLocation({
      city: '1',
      countryCode: '1',
      lat: 1,
      lon: 1
    });
    const data = db.getSettings();
    expect(data).toEqual({
      timezone: '1',
      location: { city: '1', countryCode: '1', lat: 1, lon: 1 }
    });
  });
  it('should add ringtone', () => {
    db.addRingtone({ name: '1', location: '1' });
    const data = db.getRingtones();
    const should = [{ name: '1', location: '1' }, ...defaultDatabase.ringtones];
    expect(data).toIncludeSameMembers(should);
  });
  it('should remove ringtone', () => {
    db.deleteRingtone({ name: '1', location: '1' });
    const data = db.getRingtones();
    expect(data).toEqual([...defaultDatabase.ringtones]);
  });
});
