import { useContext, useEffect } from 'react';
import { useQueryClient } from 'react-query';

import { SocketContext } from '../contexts/Socket';

function HandleSocket(): null {
  const socketContext = useContext(SocketContext);
  const queryClient = useQueryClient();
  useEffect(() => {
    socketContext.on('databaseChange', () =>
      queryClient.refetchQueries(['alarms']),
    );
    return () => {
      socketContext.removeAllListeners('databaseChange');
    };
  }, [queryClient, socketContext]);
  return null;
}

export default HandleSocket;
