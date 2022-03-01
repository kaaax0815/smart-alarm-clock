import { formatRelative, fromUnixTime } from 'date-fns';
import { de } from 'date-fns/locale';

export function relativeFromUnix(unix: number): string {
  return formatRelative(fromUnixTime(unix), new Date(), { locale: de }).split(' ')[0];
}
