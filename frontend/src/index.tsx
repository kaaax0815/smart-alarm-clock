import './index.css';

import { CircularProgress } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';

import SettingsContext from './contexts/Settings';
import { socket, SocketContext } from './contexts/Socket';
import Face from './Face';

function App(): JSX.Element {
  const [loading, setLoading] = React.useState(true);
  const [shown, setShown] = React.useState(false);
  const [locale, setLocale] = React.useState('');
  const [timezone, setTimezone] = React.useState('');
  fetch(`http://localhost:${process.env.REACT_APP_SOCKETIO_PORT}/settings`)
    .then((response) => response.json())
    .then((settings) => {
      setLocale(settings.locale);
      setTimezone(settings.timezone);
      setLoading(false);
    });
  if (loading) {
    return <CircularProgress color="inherit" />;
  }
  return (
    <React.StrictMode>
      <SocketContext.Provider value={socket}>
        <SettingsContext.Provider
          value={{ shown, setShown, locale, setLocale, timezone, setTimezone }}
        >
          <Face />
        </SettingsContext.Provider>
      </SocketContext.Provider>
    </React.StrictMode>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
