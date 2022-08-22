import { useQuery } from '@tanstack/react-query';

import { getRingtones } from '../utils/api';

export function useRingtones() {
  return useQuery(['ringtones'], () => getRingtones());
}
