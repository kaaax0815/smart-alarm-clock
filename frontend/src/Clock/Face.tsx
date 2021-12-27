import './Face.css';

import { useContext } from 'react';

import SettingsContext from '../contexts/Settings';
import Clock from './components/Clock';
import Date from './components/Date';
import StartButton from './components/StartButton';
import Weather from './components/Weather';
function Face(): JSX.Element {
  const settingsContext = useContext(SettingsContext);
  return (
    <div className="Face">
      <StartButton />
      <Clock
        className="Clock"
        locale={settingsContext.locale}
        timeZone={settingsContext.timezone}
      />
      <Date className="Date" locale={settingsContext.locale} timeZone={settingsContext.timezone} />
      <Weather />
    </div>
  );
}

export default Face;
