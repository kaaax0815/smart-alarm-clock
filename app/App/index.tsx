import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

import App from './App';
import {socket, socketContext} from './contexts/Socket';

export default function Start() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <socketContext.Provider value={socket}>
        <App />
      </socketContext.Provider>
    </QueryClientProvider>
  );
}
