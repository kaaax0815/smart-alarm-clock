import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import React, { useEffect } from 'react';
import RNSInfo from 'react-native-sensitive-info';
import { QueryClient, QueryClientProvider } from 'react-query';
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
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <SocketContext.Provider value={{ loading, socket }}>
          <NativeBaseProvider theme={theme}>
            <HandleSocket />
            <App />
          </NativeBaseProvider>
        </SocketContext.Provider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
