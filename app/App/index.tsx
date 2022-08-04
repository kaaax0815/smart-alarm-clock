import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import RNSInfo from 'react-native-sensitive-info';
import socketio from 'socket.io-client';

import App from './App';
import HandleSocket from './components/HandleSocket';
import theme from './constants/theme';
import { SocketContext } from './contexts/Socket';

export default function Start() {
  const queryClient = new QueryClient();
  const [loading, setLoading] = React.useState(true);
  const [socket, setSocket] = React.useState<
    ReturnType<typeof socketio> | undefined
  >();

  async function getIP() {
    const ip = await RNSInfo.getItem('backendIP', {
      sharedPreferencesName: 'appPrefs',
      keychainService: 'appChain',
    });
    console.log({ ip, __DEV__ });
    if (__DEV__ && !ip) {
      await RNSInfo.setItem('backendIP', '10.0.2.2', {
        sharedPreferencesName: 'appPrefs',
        keychainService: 'appChain',
      });
    }
    const sock = socketio(`http://${ip}:3535`, {
      query: { type: 'client' },
    });
    setSocket(sock);
    setLoading(false);
  }

  useEffect(() => {
    getIP();
  }, []);
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <SocketContext.Provider value={{ loading, socket }}>
            <HandleSocket />
            <App />
          </SocketContext.Provider>
        </QueryClientProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
