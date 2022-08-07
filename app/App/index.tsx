import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { Provider as PaperProvider, Text } from 'react-native-paper';
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
  const [loading, setLoading] = React.useState(true);

  const setIP = React.useCallback((value: string) => {
    RNSInfo.setItem('backendIP', value, {
      sharedPreferencesName: 'appPrefs',
      keychainService: 'appChain',
    }).then(() => _setIP(value));
  }, []);

  useEffect(() => {
    if (ip) {
      return;
    }
    console.debug('Try to get IP from Shared Preferences');
    RNSInfo.getItem('backendIP', {
      sharedPreferencesName: 'appPrefs',
      keychainService: 'appChain',
    }).then((v) => {
      if (v !== null) {
        _setIP(v);
      }
      setLoading(false);
    });
  }, [ip]);

  useEffect(() => {
    if (!ip || loading) {
      return;
    }
    console.debug('Initializing socket');
    const sock = socketio(`http://${ip}:3535`, {
      query: { type: 'client' },
    });
    setSocket(sock);
  }, [ip, loading]);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <SocketContext.Provider value={socket}>
            <HandleSocket />
            {loading ? <Text>Loading</Text> : <App ip={ip} setIP={setIP} />}
          </SocketContext.Provider>
        </QueryClientProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
