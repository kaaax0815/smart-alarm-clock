import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';

import { SettingsContext } from '../contexts/Settings';
import { deleteRingtones, getRingtones, Ringtone } from '../utils/api';

export function useRingtones() {
  const settingsContext = useContext(SettingsContext);
  return useQuery(['ringtones'], () => getRingtones(settingsContext.ip!));
}

export function useDeleteRingtone() {
  const queryClient = useQueryClient();
  const settingsContext = useContext(SettingsContext);
  return useMutation<unknown, unknown, Pick<Ringtone, 'name'>>(
    (ringtone) => deleteRingtones(settingsContext.ip!, ringtone),
    {
      onMutate: async (ringtone) => {
        await queryClient.cancelQueries(['ringtones']);
        const prev = queryClient.getQueryData<Ringtone[]>(['ringtones']);
        if (prev) {
          queryClient.setQueryData<Ringtone[]>(
            ['ringtones'],
            prev.filter((oldRingtone) => oldRingtone.name !== ringtone.name),
          );
        }
        return prev;
      },
      onError: (_error, _vars, prev) => {
        queryClient.setQueryData(['ringtones'], prev);
      },
    },
  );
}
