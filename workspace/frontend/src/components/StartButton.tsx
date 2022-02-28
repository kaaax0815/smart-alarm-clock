import './StartButton.css';

import { Apps } from '@mui/icons-material';
import { Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function StartButton(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Fab
      className="__StartButton-Fab"
      onClick={() => {
        navigate('/');
      }}
    >
      <Apps />
    </Fab>
  );
}

export default StartButton;
