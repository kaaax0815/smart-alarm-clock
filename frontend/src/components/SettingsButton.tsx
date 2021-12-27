import './SettingsButton.css';

import { Close, Settings } from '@mui/icons-material';
import { Fab } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SettingsButton(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Fab
      className="__SettingsButton-Fab"
      onClick={() => {
        navigate('/face/settings');
      }}
    >
      {location.pathname === '/face/settings' ? <Close /> : <Settings />}
    </Fab>
  );
}
