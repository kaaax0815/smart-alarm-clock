import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';

import { handleError } from '~/components/Error';
import { SettingsContext } from '~/contexts/Settings';
import { deleteRingtones, getRingtones, isOnline, Ringtone } from '~/utils/api';

export function useRingtones() {
  const settingsContext = useContext(SettingsContext);
  return useQuery(['ringtones'], () => getRingtones(settingsContext.ip!), {
    onError: (error) => {
      if (error instanceof Error) {
        handleError('useRingtones', error);
      }
    },
    retry: isOnline,
  });
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
        if (_error instanceof Error) {
          handleError('deleteRingtone', _error);
        }
        queryClient.setQueryData(['ringtones'], prev);
      },
    },
  );
}
