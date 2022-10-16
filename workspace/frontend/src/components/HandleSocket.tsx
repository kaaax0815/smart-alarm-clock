import { useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';

import { popUpContext as PopUpContext } from '../contexts/PopUp';
import { SocketContext } from '../contexts/Socket';

function HandleSocket(): null {
  const socketContext = useContext(SocketContext);
  const popUpContext = useContext(PopUpContext);
  const queryClient = useQueryClient();
  useEffect(() => {
    socketContext.on('databaseChange', () => queryClient.refetchQueries(['settings']));
    socketContext.on('alarm', (al) => popUpContext.handleAlarm(al));
    return () => {
      socketContext.disconnect();
    };
  }, [queryClient, socketContext]);
  return null;
}

export default HandleSocket;
