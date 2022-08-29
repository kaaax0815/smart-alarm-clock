import './global.css';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HashRouter, Route, Routes } from 'react-router-dom';

import HandleSocket from './components/HandleSocket';
import PopUpContext from './contexts/PopUp';
import { socket, SocketContext } from './contexts/Socket';
import { ClockScreen, SettingsScreen, StartScreen, WeatherScreen } from './screens';
import ErrorBoundary from './utils/ErrorBoundary';

function App(): JSX.Element {
  const queryClient = new QueryClient();
  return (
    <StrictMode>
      <HashRouter basename="/">
        <QueryClientProvider client={queryClient}>
          <PopUpContext>
            <SocketContext.Provider value={socket}>
              <HandleSocket />
              <Routes>
                <Route
                  path="/"
                  element={
                    <ErrorBoundary key={'/'}>
                      <StartScreen />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ErrorBoundary key={'/settings'}>
                      <SettingsScreen />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/clock"
                  element={
                    <ErrorBoundary key={'/clock'}>
                      <ClockScreen />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/weather"
                  element={
                    <ErrorBoundary key={'/weather'}>
                      <WeatherScreen />
                    </ErrorBoundary>
                  }
                />
              </Routes>
            </SocketContext.Provider>
          </PopUpContext>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </HashRouter>
    </StrictMode>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
