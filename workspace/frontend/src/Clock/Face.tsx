import { CircularProgress } from '@mui/material';

import StartButton from '../components/StartButton';
import useSettings from '../hooks/useSettings';
import Clock from './components/Clock';
import Date from './components/Date';
import Weather from './components/Weather';
import styles from './Face.module.css';
function Face(): JSX.Element {
  const { data: settingsData, status: settingsStatus } = useSettings();
  if (settingsStatus !== 'success') {
    return (
      <div className={styles.Loading_Parent}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className={styles.Face}>
      <StartButton />
      <Clock className={styles.Clock} timeZone={settingsData!.timezone} />
      <Date className={styles.Date} timeZone={settingsData!.timezone} />
      <Weather />
    </div>
  );
}

export default Face;
