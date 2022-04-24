import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App';
import HandleSocket from './components/HandleSocket';
import theme from './constants/theme';
import { socket, SocketContext } from './contexts/Socket';

export default function Start() {
  const queryClient = new QueryClient();
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <SocketContext.Provider value={socket}>
          <NativeBaseProvider theme={theme}>
            <HandleSocket />
            <App />
          </NativeBaseProvider>
        </SocketContext.Provider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
