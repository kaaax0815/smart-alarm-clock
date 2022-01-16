import './index.css';

import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HashRouter, Route, Routes } from 'react-router-dom';

import ClockFace from './Clock/Face';
import { socket, SocketContext } from './contexts/Socket';
import Settings from './Settings/Settings';
import Start from './Start';
import Weather from './Weather';

function App(): JSX.Element {
  const queryClient = new QueryClient();
  return (
    <HashRouter basename="/">
      <QueryClientProvider client={queryClient}>
        <SocketContext.Provider value={socket}>
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
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
