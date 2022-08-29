import { Button } from '@mui/material';
import { useContext, useEffect } from 'react';

import { popUpContext as PopUpContext } from '../../contexts/PopUp';
import Music from '../../utils/Music';
import styles from './index.module.css';

export default function Alarm() {
  const {
    popUp: { open, alarm },
    setPopUp
  } = useContext(PopUpContext);
  useEffect(() => {
    if (alarm) {
      Music.getInstance().playRingtone(alarm.ringtone);
    }
    return () => {
      Music.getInstance().stop();
    };
  }, [alarm]);
  if (!open || !alarm) {
    return null;
  }
  return (
    <div className={styles.alarm}>
      <div className={styles.container}>
        <h2>🔔 Wecker</h2>
        <h3>{alarm.name}</h3>
        <Button onClick={() => setPopUp({ alarm: undefined, open: false })}>Beenden</Button>
      </div>
    </div>
  );
}
