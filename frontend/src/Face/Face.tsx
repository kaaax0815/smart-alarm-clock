import './Face.css';

import { useContext } from 'react';

import Clock from './components/Clock';
import Date from './components/Date';
import SettingsButton from './components/SettingsButton';
import StartButton from './components/StartButton';
import SettingsContext from './contexts/Settings';
function Face(): JSX.Element {
  const settingsContext = useContext(SettingsContext);
  return (
    <div className="Face">
      <StartButton />
      <SettingsButton />
      <Clock
        className="Clock"
        locale={settingsContext.locale}
        timeZone={settingsContext.timezone}
      />
      <Date className="Date" locale={settingsContext.locale} timeZone={settingsContext.timezone} />
    </div>
  );
}

export default Face;
