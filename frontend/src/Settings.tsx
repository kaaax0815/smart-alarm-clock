import './Settings.css';

import { exec } from '../electron/preload';
import SettingsButton from './components/SettingsButton';

export default function Settings(): JSX.Element {
  return (
    <div className="Settings">
      <SettingsButton />
      <h1>Settings</h1>
      <a
        onClick={async () => {
          await (window as typeof window & exec).exec('sudo poweroff');
        }}
      >
        Shutdown
      </a>
    </div>
  );
}
