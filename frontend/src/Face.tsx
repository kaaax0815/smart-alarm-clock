import './Face.css';

import { useContext } from 'react';

import Clock from './components/Clock';
import Date from './components/Date';
import SettingsButton from './components/SettingsButton';
import SettingsContext from './contexts/Settings';
import Settings from './Settings';

function Face(): JSX.Element {
  const settingsContext = useContext(SettingsContext);
  if (settingsContext.shown) {
    return <Settings />;
  }
  return (
    <div className="Face">
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
