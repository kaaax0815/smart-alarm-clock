import './index.css';

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
              <Route path="/" element={<Start />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/clock" element={<ClockFace />} />
              <Route path="/weather" element={<Weather />} />
            </Routes>
          </SocketContext.Provider>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </HashRouter>
    </StrictMode>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
