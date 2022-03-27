import './global.css';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HashRouter, Route, Routes } from 'react-router-dom';

import ClockFace from './Clock/Face';
import HandleSocket from './components/HandleSocket';
import { socket, SocketContext } from './contexts/Socket';
import Settings from './Settings/Settings';
import Start from './Start';
import ErrorBoundary from './utils/ErrorBoundary';
import Weather from './Weather';

function App(): JSX.Element {
  const queryClient = new QueryClient();
  return (
    <StrictMode>
      <HashRouter basename="/">
        <QueryClientProvider client={queryClient}>
          <SocketContext.Provider value={socket}>
            <HandleSocket />
            <Routes>
              <Route
                path="/"
                element={
                  <ErrorBoundary key={'/'}>
                    <Start />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/settings"
                element={
                  <ErrorBoundary key={'/settings'}>
                    <Settings />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/clock"
                element={
                  <ErrorBoundary key={'/clock'}>
                    <ClockFace />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/weather"
                element={
                  <ErrorBoundary key={'/weather'}>
                    <Weather />
                  </ErrorBoundary>
                }
              />
            </Routes>
          </SocketContext.Provider>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </HashRouter>
    </StrictMode>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
