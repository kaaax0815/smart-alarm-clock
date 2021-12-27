import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';

import SettingsContext from './contexts/Settings';
import Face from './Face';
import FaceSettings from './Settings';

function FaceRouter({ run }: { run: 'face' | 'settings' }): JSX.Element {
  const [loading, setLoading] = React.useState(true);
  const [locale, setLocale] = React.useState('');
  const [timezone, setTimezone] = React.useState('');
  useEffect(() => {
    fetch(`http://localhost:${process.env.REACT_APP_SOCKETIO_PORT}/api/settings`)
      .then((response) => response.json())
      .then((settings) => {
        setLocale(settings.locale);
        setTimezone(settings.timezone);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <CircularProgress color="inherit" />;
  }
  return (
    <SettingsContext.Provider value={{ locale, setLocale, timezone, setTimezone }}>
      {run === 'face' ? <Face /> : <FaceSettings />}
    </SettingsContext.Provider>
  );
}
export default FaceRouter;
