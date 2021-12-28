import './index.css';

import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';

import ClockFace from './Clock/Face';
import SettingsContext from './contexts/Settings';
import { socket, SocketContext } from './contexts/Socket';
import Settings from './Settings/Settings';
import Start from './Start';

function App(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [locale, setLocale] = useState('');
  const [timezone, setTimezone] = useState('');
  const [location, setLocation] = useState({ city: '', state: '', countryCode: '' });
  useEffect(() => {
    fetch(`http://localhost:${process.env.REACT_APP_SOCKETIO_PORT}/api/settings`)
      .then((response) => response.json())
      .then((settings) => {
        setLocale(settings.locale);
        setTimezone(settings.timezone);
        setLocation(settings.location);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <CircularProgress color="inherit" />;
  }
  return (
    <HashRouter basename="/">
      <SocketContext.Provider value={socket}>
        <SettingsContext.Provider
          value={{ locale, setLocale, timezone, setTimezone, location, setLocation }}
        >
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/clock" element={<ClockFace />} />
          </Routes>
        </SettingsContext.Provider>
      </SocketContext.Provider>
    </HashRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
