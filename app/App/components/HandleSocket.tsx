import { useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';

import { SocketContext } from '../contexts/Socket';

function HandleSocket(): null {
  const socket = useContext(SocketContext);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (socket !== undefined) {
      socket.on('databaseChange', () => {
        console.log('databaseChange');
        queryClient.refetchQueries(['alarms', 'ringtones']);
      });
      return () => {
        socket!.removeAllListeners('databaseChange');
      };
    }
  }, [queryClient, socket]);
  return null;
}

export default HandleSocket;
