import { useContext, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { SocketContext } from '../contexts/Socket';

function HandleSocket(): null {
  const { loading, socket } = useContext(SocketContext);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!loading) {
      socket!.on('databaseChange', () => {
        console.log('databaseChange');
        queryClient.refetchQueries(['alarms', 'ringtones']);
      });
      return () => {
        socket!.removeAllListeners('databaseChange');
      };
    }
  }, [queryClient, loading, socket]);
  return null;
}

export default HandleSocket;
