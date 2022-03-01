import { format, formatRelative, fromUnixTime } from 'date-fns';
import { de } from 'date-fns/locale';

export function relativeDaysFromUnix(unix: number): string {
  return formatRelative(fromUnixTime(unix), new Date(), { locale: de });
}

export function relativeHoursFromUnix(unix: number): string {
  return formatRelative(fromUnixTime(unix), new Date(), { locale: de }).split(' ')[2];
}

export function formatFromUnix(unix: number, _format: string): string {
  return format(fromUnixTime(unix), _format, { locale: de });
}
