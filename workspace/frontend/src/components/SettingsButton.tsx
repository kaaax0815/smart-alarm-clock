import './SettingsButton.css';

import { Settings } from '@mui/icons-material';
import { Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SettingsButton(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Fab
      className="__SettingsButton-Fab"
      onClick={() => {
        navigate('/settings');
      }}
    >
      <Settings />
    </Fab>
  );
}
