import { useState } from 'react';

import Detail from './Detail';
import Forecasts from './Forecasts';
import styles from './index.module.css';

export default function Forecast() {
  const [selected, setSelected] = useState(0);
  return (
    <div className={styles.forecast}>
      <Detail selected={selected} />
      <Forecasts selected={selected} setSelected={setSelected} />
    </div>
  );
}
