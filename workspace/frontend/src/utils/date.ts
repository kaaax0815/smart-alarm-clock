import { formatRelative, fromUnixTime } from 'date-fns';
import { de } from 'date-fns/locale';
import { formatInTimeZone } from 'date-fns-tz';

export function relativeDaysFromUnix(unix: number): string {
  return formatRelative(fromUnixTime(unix), new Date(), { locale: de }).split(' ')[0];
}

export function formatFromUnix(unix: number, timeZone: string, _format: string): string {
  return formatInTimeZone(fromUnixTime(unix), timeZone, _format, { locale: de });
}
