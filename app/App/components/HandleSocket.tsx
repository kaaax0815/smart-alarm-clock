import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';

import { SocketContext } from '~/contexts/Socket';
import { isOnline } from '~/utils/api';

const invalidateAll = (queryClient: QueryClient) => {
  queryClient.invalidateQueries(['alarms']);
  queryClient.invalidateQueries(['ringtones']);
  queryClient.invalidateQueries(['settings']);
};

function HandleSocket(): null {
  const socket = useContext(SocketContext);
  const queryClient = useQueryClient();
  const options = { wasLastOffline: false };
  useEffect(() => {
    if (socket !== undefined) {
      socket.on('databaseChange', () => {
        console.debug('SOCKET:', 'databaseChange');
        invalidateAll(queryClient);
      });
      socket.on('connect_error', (err) => {
        console.warn('SOCKET:', `connect_error due to ${err.message}`);
        options.wasLastOffline = true;
      });
      socket.on('connect', () => {
        if (options.wasLastOffline && isOnline()) {
          console.debug('SOCKET:', 'Reconnected to Server');
          invalidateAll(queryClient);
          options.wasLastOffline = false;
          return;
        }
        console.debug('SOCKET:', 'Connected to Server');
      });
      return () => {
        socket.removeAllListeners();
      };
    }
  }, [queryClient, socket]);
  return null;
}

export default HandleSocket;
