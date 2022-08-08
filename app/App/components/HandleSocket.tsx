import { useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';

import { SocketContext } from '../contexts/Socket';

function HandleSocket(): null {
  const socket = useContext(SocketContext);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (socket !== undefined) {
      socket.on('databaseChange', () => {
        console.debug('SOCKET:', 'databaseChange');
        /*const alarmsCache = queryClient
          .getQueryCache()
          .getAll()
          .find((v) => v.queryKey[0] === 'alarms');
        const ringtonesCache = queryClient
          .getQueryCache()
          .getAll()
          .find((v) => v.queryKey[0] === 'ringtones');
        alarmsCache?.fetch();
        ringtonesCache?.fetch();*/
        queryClient.invalidateQueries(['alarms']);
      });
      socket.on('connect_error', (err) => {
        console.warn('SOCKET:', `connect_error due to ${err.message}`);
      });
      socket.on('connect', () => {
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
