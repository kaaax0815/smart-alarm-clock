import './Header.css';

import { getSettingsResponse } from 'backend';
import { useEffect, useRef } from 'react';

import useSettings from '../hooks/useSettings';

function useDate(settingsData?: getSettingsResponse) {
  const dateRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (dateRef.current !== null) {
      const fToRun = () =>
        new window.Date().toLocaleDateString('de', {
          timeZone: settingsData!.timezone
        });
      dateRef.current.innerHTML = fToRun();
      const interval = setInterval(() => {
        dateRef.current!.innerHTML = fToRun();
      }, 10000);
      return () => clearInterval(interval);
    }
  });
  return dateRef;
}

export default function Header() {
  const { data: settingsData, status: settingsStatus } = useSettings();
  const dateRef = useDate(settingsData);
  if (settingsStatus !== 'success') {
    return <div>Loading...</div>;
  }
  return (
    <div className="Header">
      <h1>{settingsData!.location.city}</h1>
      <h2 ref={dateRef}></h2>
    </div>
  );
}
