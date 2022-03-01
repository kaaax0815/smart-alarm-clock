import './Settings.css';

import { Box, Divider, List, ListSubheader } from '@mui/material';

import Location from './components/Location';
import Reboot from './components/Reboot';
import SettingsBar from './components/SettingsBar';
import Shutdown from './components/Shutdown';
import Timezone from './components/Timezone';

export default function Settings(): JSX.Element {
  const timezone = Timezone();
  const shutdown = Shutdown();
  const reboot = Reboot();
  const location = Location();
  return (
    <div className="Settings">
      <SettingsBar />
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <ListSubheader disableSticky>Geographic</ListSubheader>
        <nav aria-label="geographic settings">
          <List>
            {timezone.item}
            {location.item}
          </List>
        </nav>
        <Divider />
        <ListSubheader disableSticky>Power</ListSubheader>
        <nav aria-label="power options">
          <List>
            {shutdown.item}
            {reboot.item}
          </List>
        </nav>
      </Box>
      {timezone.dialog}
      {shutdown.dialog}
      {reboot.dialog}
      {location.dialog}
    </div>
  );
}
