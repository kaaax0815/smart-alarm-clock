import { useCallback, useContext, useEffect } from 'react';
import { useQueryClient } from 'react-query';

import { SocketContext } from '../contexts/Socket';

function HandleSocket(): null {
  const socketContext = useContext(SocketContext);
  const queryClient = useQueryClient();
  const handleDatabaseChange = useCallback(() => {
    queryClient.refetchQueries(['settings']);
  }, [queryClient]);
  useEffect(() => {
    socketContext.on('databaseChange', handleDatabaseChange);
    return () => {
      socketContext.disconnect();
    };
  }, [handleDatabaseChange, queryClient, socketContext]);
  return null;
}

export default HandleSocket;
