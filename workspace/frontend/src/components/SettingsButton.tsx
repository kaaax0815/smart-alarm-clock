import { Settings } from '@mui/icons-material';
import { Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import styles from './SettingsButton.module.css';

export default function SettingsButton(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Fab
      className={styles.Fab}
      onClick={() => {
        navigate('/settings');
      }}
    >
      <Settings />
    </Fab>
  );
}
