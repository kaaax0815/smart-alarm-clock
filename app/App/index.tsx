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

const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

export default function Start() {
  const [socket, setSocket] = React.useState<
    ReturnType<typeof socketio> | undefined
  >();
  const [ip, _setIP] = React.useState<string | undefined>();

  const setIP = React.useCallback((value: string) => {
    RNSInfo.setItem('backendIP', value, {
      sharedPreferencesName: 'appPrefs',
      keychainService: 'appChain',
    }).then(() => _setIP(value));
  }, []);

  useEffect(() => {
    RNSInfo.getItem('backendIP', {
      sharedPreferencesName: 'appPrefs',
      keychainService: 'appChain',
    }).then(_setIP);
    console.debug({ ip, __DEV__ });
    if (__DEV__ && !ip) {
      console.warn('IP not set');
      /* await RNSInfo.setItem('backendIP', '10.0.2.2', {
        sharedPreferencesName: 'appPrefs',
        keychainService: 'appChain',
      }); */
    }
    if (ip) {
      const sock = socketio(`http://${ip}:3535`, {
        query: { type: 'client' },
      });
      setSocket(sock);
    }
  }, [ip]);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <SocketContext.Provider value={socket}>
            <HandleSocket />
            <App ip={ip} setIP={setIP} />
          </SocketContext.Provider>
        </QueryClientProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
