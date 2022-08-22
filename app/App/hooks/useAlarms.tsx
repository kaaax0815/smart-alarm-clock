import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  Alarm,
  deleteAlarms,
  getAlarms,
  patchAlarms,
  postAlarms,
} from '../utils/api';

export function useAlarms() {
  return useQuery(['alarms'], () => getAlarms());
}

export function useAddAlarm() {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, Alarm, Alarm[]>(
    (alarm) => postAlarms(alarm),
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
      onSettled: () => {
        queryClient.invalidateQueries(['alarms']);
      },
    },
  );
}

export function useDeleteAlarm() {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, Pick<Alarm, 'name'>>(
    (alarm) => deleteAlarms(alarm),
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
      onSettled: () => {
        queryClient.invalidateQueries(['alarms']);
      },
    },
  );
}

export function useUpdateAlarm() {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, Partial<Alarm> & { name: string }>(
    (alarm) => patchAlarms(alarm),
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
      onSettled: () => {
        queryClient.invalidateQueries(['alarms']);
      },
    },
  );
}
