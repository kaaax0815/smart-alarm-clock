import { Link } from 'react-router-dom';

import SettingsButton from './components/SettingsButton';
import styles from './Start.module.css';

function Start(): JSX.Element {
  return (
    <div className={styles.Start}>
      <SettingsButton />
      <h1>Available Programs</h1>
      <div className={styles.grid}>
        <Link to="/clock" className={styles.card}>
          <h2>⏰ Clock</h2>
        </Link>

        <Link to="/weather" className={styles.card}>
          <h2>☁️ Weather</h2>
        </Link>
      </div>
    </div>
  );
}

export default Start;
