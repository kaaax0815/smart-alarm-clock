import db from './database';
import { socketIO } from './index';
import { database } from './Models';

export default class Alarm {
  days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
  interval?: NodeJS.Timeout;
  constructor() {
    this.initializeInterval();
  }
  /** Start interval at beginning of minute */
  initializeInterval() {
    if ([0, 1, 2, 3].includes(new Date().getSeconds())) {
      console.log('Starting Alarm Service');
      this.check();
      this.interval = setInterval(() => this.check(), 1 * 60 * 1000);
    } else {
      setTimeout(() => this.initializeInterval(), 3000);
    }
  }
  check() {
    const alarms = db.getAlarms();
    const date = new Date();
    /** `Day, HH:MM:SS` */
    const currentDate = date.toLocaleTimeString('de-DE', {
      timeZone: db.getSettings().timezone,
      weekday: 'long'
    });
    /** In `HH:MM` format */
    const currentTime = currentDate.slice(0, -3).slice(-5);
    const currentDay = currentDate.split(',')[0];
    const currentDayIndex = this.days.indexOf(currentDay);
    for (const alarm of alarms) {
      if (alarm.enabled && alarm.time === currentTime && alarm.days[currentDayIndex]) {
        this.ring(alarm);
      }
    }
  }
  ring(alarm: database['alarms'][0]) {
    console.log('Ringing', alarm);
    socketIO.emitFrontend('alarm', alarm);
  }
  stop() {
    this.interval && clearInterval(this.interval);
  }
}
