import {useQuery} from 'react-query';

import {getAlarms} from '../utils/api';

export function useAlarms() {
  return useQuery('alarms', () => getAlarms());
}
