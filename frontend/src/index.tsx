import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import SettingsContext from './contexts/Settings';
import Face from './Face';

function App(): JSX.Element {
  const [shown, setShown] = React.useState(false);
  return (
    <React.StrictMode>
      <SettingsContext.Provider value={{ shown, setShown }}>
        <Face />
      </SettingsContext.Provider>
    </React.StrictMode>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
