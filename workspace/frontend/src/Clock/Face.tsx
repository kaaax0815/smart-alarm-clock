import './Face.css';

import { CircularProgress } from '@mui/material';

import StartButton from '../components/StartButton';
import useSettings from '../hooks/useSettings';
import Clock from './components/Clock';
import Date from './components/Date';
import Weather from './components/Weather';
function Face(): JSX.Element {
  const { data: settingsData, status: settingsStatus } = useSettings();
  if (settingsStatus !== 'success') {
    return <CircularProgress />;
  }
  return (
    <div className="Face">
      <StartButton />
      <Clock className="Clock" timeZone={settingsData!.timezone} />
      <Date className="Date" timeZone={settingsData!.timezone} />
      <Weather />
    </div>
  );
}

export default Face;
