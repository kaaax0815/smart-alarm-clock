import './SettingsButton.css';

import { Close, Settings } from '@mui/icons-material';
import { Fab } from '@mui/material';
import { useContext } from 'react';

import SettingsContext from '../contexts/Settings';

export default function SettingsButton(): JSX.Element {
  const { shown, setShown } = useContext(SettingsContext);
  return (
    <Fab
      className="__SettingsButton-Fab"
      onClick={() => {
        setShown(!shown);
      }}
    >
      {shown ? <Close /> : <Settings />}
    </Fab>
  );
}
