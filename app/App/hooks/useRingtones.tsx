import { useQuery } from 'react-query';

import { getRingtones } from '../utils/api';

export function useRingtones() {
  return useQuery('ringtones', () => getRingtones());
}
