import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import SettingsContext from './contexts/Settings';
import { socket, SocketContext } from './contexts/Socket';
import Face from './Face';

function App(): JSX.Element {
  const [shown, setShown] = React.useState(false);
  const [locale, setLocale] = React.useState('de-DE');
  const [timezone, setTimezone] = React.useState('Europe/Berlin');
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
