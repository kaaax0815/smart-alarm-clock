import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';

import { SettingsContext } from '~/contexts/Settings';
import {
  Alarm,
  deleteAlarms,
  getAlarms,
  patchAlarms,
  postAlarms,
} from '~/utils/api';

export function useAlarms() {
  const settingsContext = useContext(SettingsContext);
  return useQuery(['alarms'], () => getAlarms(settingsContext.ip!));
}

export function useAddAlarm() {
  const queryClient = useQueryClient();
  const settingsContext = useContext(SettingsContext);
  return useMutation<unknown, unknown, Alarm, Alarm[]>(
    (alarm) => postAlarms(settingsContext.ip!, alarm),
    {
      onMutate: async (alarm) => {
        await queryClient.cancelQueries(['alarms']);
        const prev = queryClient.getQueryData<Alarm[]>(['alarms']);
        if (prev) {
          queryClient.setQueryData<Alarm[]>(['alarms'], [...prev, alarm]);
        }
        return prev;
      },
      onError: (_error, _vars, prev) => {
        queryClient.setQueryData(['alarms'], prev);
      },
    },
  );
}

export function useDeleteAlarm() {
  const queryClient = useQueryClient();
  const settingsContext = useContext(SettingsContext);
  return useMutation<unknown, unknown, Pick<Alarm, 'name'>>(
    (alarm) => deleteAlarms(settingsContext.ip!, alarm),
    {
      onMutate: async (alarm) => {
        await queryClient.cancelQueries(['alarms']);
        const prev = queryClient.getQueryData<Alarm[]>(['alarms']);
        if (prev) {
          queryClient.setQueryData<Alarm[]>(
            ['alarms'],
            prev.filter((oldAlarm) => oldAlarm.name !== alarm.name),
          );
        }
        return prev;
      },
      onError: (_error, _vars, prev) => {
        queryClient.setQueryData(['alarms'], prev);
      },
    },
  );
}

export function useUpdateAlarm() {
  const queryClient = useQueryClient();
  const settingsContext = useContext(SettingsContext);
  return useMutation<unknown, unknown, Partial<Alarm> & { name: string }>(
    (alarm) => patchAlarms(settingsContext.ip!, alarm),
    {
      onMutate: async (alarm) => {
        await queryClient.cancelQueries(['alarms']);
        const prev = queryClient.getQueryData<Alarm[]>(['alarms']);
        if (prev) {
          queryClient.setQueryData<Alarm[]>(
            ['alarms'],
            prev.map((o) => (o.name === alarm.name ? { ...o, ...alarm } : o)),
          );
        }
        return prev;
      },
      onError: (_error, _vars, prev) => {
        queryClient.setQueryData(['alarms'], prev);
      },
    },
  );
}
