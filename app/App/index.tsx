import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App';
import HandleSocket from './components/HandleSocket';
import { socket, SocketContext } from './contexts/Socket';

export default function Start() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SocketContext.Provider value={socket}>
        <HandleSocket />
        <App />
      </SocketContext.Provider>
    </QueryClientProvider>
  );
}
