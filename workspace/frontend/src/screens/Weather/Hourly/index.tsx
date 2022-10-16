import { useState } from 'react';

import useSettings from '../../../hooks/useSettings';
import useWeather from '../../../hooks/useWeather';
import WeatherIcon from '../../../icons/weather';
import { formatFromUnix } from '../../../utils/date';
import styles from './index.module.css';

export default function Hourly() {
  const { data: weatherData, status: weatherStatus } = useWeather();
  const { data: settingsData, status: settingsStatus } = useSettings();
  const [pos, setPos] = useState({
    top: 0,
    left: 0,
    x: 0,
    y: 0,
    down: false
  });

  if (weatherStatus !== 'success' || settingsStatus !== 'success') {
    return <div>Lädt...</div>;
  }

  function handleMouseExit(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const elem = e.currentTarget;
    elem.style.cursor = 'grab';
    setPos((pos) => ({
      ...pos,
      down: false
    }));
  }

  return (
    <div
      className={styles.Hourly}
      onMouseDown={(e) => {
        const elem = e.currentTarget;
        elem.style.cursor = 'grabbing';

        setPos({
          // The current scroll
          left: elem.scrollLeft,
          top: elem.scrollTop,
          // Get the current mouse position
          x: e.clientX,
          y: e.clientY,
          // grabbing state
          down: true
        });
      }}
      onMouseMove={(e) => {
        if (!pos.down) {
          return;
        }
        const elem = e.currentTarget;
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Scroll the element
        elem.scrollTop = pos.top - dy;
        elem.scrollLeft = pos.left - dx;
      }}
      onMouseUp={handleMouseExit}
      onMouseLeave={handleMouseExit}
    >
      {weatherData!.hourly!.slice(1, 25).map((hour) => (
        <div key={hour.dt} className={styles.HourlyCard}>
          <div>{formatFromUnix(hour.dt, settingsData!.timezone, 'HH:mm')}</div>
          <div>{hour.temp}°C</div>
          <WeatherIcon id={hour.weather[0].icon} className={styles.icon} />
          <div>{hour.pop}%</div>
        </div>
      ))}
    </div>
  );
}
