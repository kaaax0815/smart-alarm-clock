import { Box, List, ListSubheader } from '@mui/material';

import Reboot from './components/Reboot';
import SettingsBar from './components/SettingsBar';
import Shutdown from './components/Shutdown';

export default function Settings(): JSX.Element {
  const shutdown = Shutdown();
  const reboot = Reboot();
  return (
    <div>
      <SettingsBar />
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <ListSubheader disableSticky>Energie</ListSubheader>
        <nav aria-label="power options">
          <List>
            {shutdown.item}
            {reboot.item}
          </List>
        </nav>
      </Box>
      {shutdown.dialog}
      {reboot.dialog}
    </div>
  );
}
