import { useContext, useEffect } from 'react';

import { popUpContext as PopUpContext } from '../contexts/PopUp';
import Music from '../utils/Music';
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
    <div className={styles.div}>
      {alarm.name}
      <input
        type="button"
        onClick={() => setPopUp({ alarm: undefined, open: false })}
        value="Close"
      />
    </div>
  );
}
