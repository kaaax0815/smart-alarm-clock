import { Link } from 'react-router-dom';

import SettingsButton from './components/SettingsButton';

function Start(): JSX.Element {
  return (
    <div>
      <SettingsButton />
      <h1>List of available Programs</h1>
      <ul>
        <li>
          <Link to="/clock">Clock</Link>
        </li>
        <li>
          <Link to="/weather">Weather</Link>
        </li>
      </ul>
    </div>
  );
}

export default Start;
