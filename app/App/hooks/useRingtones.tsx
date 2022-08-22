import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteRingtones, getRingtones, Ringtone } from '../utils/api';

export function useRingtones() {
  return useQuery(['ringtones'], () => getRingtones());
}

export function useDeleteRingtone() {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, Pick<Ringtone, 'name'>>(
    (ringtone) => deleteRingtones(ringtone),
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
