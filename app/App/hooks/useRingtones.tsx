import { useQuery } from 'react-query';

import { getRingtones } from '../utils/api';

export function useRingtones() {
  return useQuery('ringtones', () => getRingtones(), {
    staleTime: 5 * 60 * 1000,
  });
}
