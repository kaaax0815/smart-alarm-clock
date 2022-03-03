import { Apps } from '@mui/icons-material';
import { Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import styles from './StartButton.module.css';

function StartButton(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Fab
      className={styles.Fab}
      onClick={() => {
        navigate('/');
      }}
    >
      <Apps />
    </Fab>
  );
}

export default StartButton;
