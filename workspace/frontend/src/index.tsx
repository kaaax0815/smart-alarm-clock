import './index.css';

import { CircularProgress } from '@mui/material';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter, Route, Routes } from 'react-router-dom';

import ClockFace from './Clock/Face';
import SettingsContext from './contexts/Settings';
import { socket, SocketContext } from './contexts/Socket';
import useSettings from './hooks/useSettings';
import Settings from './Settings/Settings';
import Start from './Start';
import Weather from './Weather';

function App(): JSX.Element {
  const queryClient = new QueryClient();
  const { loading, locale, setLocale, timezone, setTimezone, location, setLocation } =
    useSettings();
  if (loading) {
    return <CircularProgress color="inherit" />;
  }
  return (
    <HashRouter basename="/">
      <QueryClientProvider client={queryClient}>
        <SocketContext.Provider value={socket}>
          <SettingsContext.Provider
            value={{ locale, setLocale, timezone, setTimezone, location, setLocation }}
          >
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/clock" element={<ClockFace />} />
              <Route path="/weather" element={<Weather />} />
            </Routes>
          </SettingsContext.Provider>
        </SocketContext.Provider>
      </QueryClientProvider>
    </HashRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
