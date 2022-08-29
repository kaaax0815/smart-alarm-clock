import { useState } from 'react';

import Detail from './Detail';
import Forecasts from './Forecasts';

export default function Forecast() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="Forecast">
      <Detail selected={selected} />
      <Forecasts selected={selected} setSelected={setSelected} />
    </div>
  );
}
