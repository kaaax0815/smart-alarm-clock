import { useMutation, useQuery, useQueryClient } from 'react-query';

import { getAPI, GetEndpoints, Models, postAPI, PostEndpoints } from '../utils/api';

export function useSettings() {
  return useQuery('settings', () => getAPI(GetEndpoints.Settings), { staleTime: 1000 * 60 * 5 });
}

const settings = Models.defaultDatabase;

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  return useMutation<Models.postSettingsResponse, unknown, Models.postSettingsRequest, unknown>(
    (settings) => postAPI(PostEndpoints.Settings, settings),
    {
      onMutate: async () => {
        await queryClient.cancelQueries('settings');
        const prev = queryClient.getQueryData('settings');
        queryClient.setQueryData<Models.postSettingsRequest>('settings', (old) => {
          return { ...old, ...settings };
        });
        return prev;
      },
      onError: (_error, _vars, prev) => {
        queryClient.setQueryData('settings', prev);
      },
      onSettled: () => {
        queryClient.invalidateQueries('settings');
      }
    }
  );
}

export default useSettings;
