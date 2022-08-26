import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';

import { SettingsContext } from '~/contexts/Settings';
import { getSettings, PostSettings, postSettings, Settings } from '~/utils/api';

export function useSettings() {
  const settingsContext = useContext(SettingsContext);
  return useQuery(['settings'], () => getSettings(settingsContext.ip!));
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const settingsContext = useContext(SettingsContext);
  return useMutation<unknown, unknown, PostSettings>(
    (settings) => postSettings(settingsContext.ip!, settings),
    {
      onMutate: async (settings) => {
        await queryClient.cancelQueries(['settings']);
        const prev = queryClient.getQueryData<Settings>(['settings']);
        if (prev) {
          queryClient.setQueryData<Settings>(['settings'], {
            ...prev,
            ...settings,
            location: {
              ...prev.location,
              ...settings.location,
            },
          });
        }
        return prev;
      },
      onError: (_error, _vars, prev) => {
        queryClient.setQueryData(['settings'], prev);
      },
    },
  );
}
