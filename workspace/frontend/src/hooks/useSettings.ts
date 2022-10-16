import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getSettings, Models, postAPI, PostEndpoints } from '../utils/api';

export function useSettings() {
  return useQuery(['settings'], () => getSettings(), { staleTime: 1000 * 60 * 5 });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, Models.PostSettingsInput, unknown>(
    (settings) => postAPI(PostEndpoints.Settings, settings),
    {
      onMutate: async (settings) => {
        await queryClient.cancelQueries(['settings']);
        const prev = queryClient.getQueryData(['settings']);
        queryClient.setQueryData<Models.PostSettingsInput>(['settings'], (old) => {
          return { ...old, ...settings };
        });
        return prev;
      },
      onError: (_error, _vars, prev) => {
        queryClient.setQueryData(['settings'], prev);
      },
      onSettled: () => {
        queryClient.invalidateQueries(['settings']);
      }
    }
  );
}

export default useSettings;
