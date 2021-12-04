import './Face.css';

import { useContext } from 'react';

import Clock from './components/Clock';
import Date from './components/Date';
import SettingsButton from './components/SettingsButton';
import SettingsContext from './contexts/Settings';
import Settings from './Settings';

function Face(): JSX.Element {
  const { shown } = useContext(SettingsContext);
  if (shown) {
    return <Settings />;
  }
  return (
    <div className="Face">
      <SettingsButton />
      <Clock className="Clock" locale="de-DE" />
      <Date className="Date" />
    </div>
  );
}

export default Face;
