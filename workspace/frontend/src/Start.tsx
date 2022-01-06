import './Start.css';

import { Link } from 'react-router-dom';

import SettingsButton from './components/SettingsButton';

function Start(): JSX.Element {
  return (
    <div className="Start">
      <SettingsButton />
      <h1>Available Programs</h1>
      <div className="grid">
        <Link to="/clock" className="card">
          <h2>⏰ Clock</h2>
        </Link>

        <Link to="/weather" className="card">
          <h2>☁️ Weather</h2>
        </Link>
      </div>
    </div>
  );
}

export default Start;
