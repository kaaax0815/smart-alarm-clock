import { Box, List, ListItem, ListItemText, ListSubheader } from '@mui/material';

import { getIPAddresses } from '../../utils/api';
import Reboot from './components/Reboot';
import SettingsBar from './components/SettingsBar';
import Shutdown from './components/Shutdown';

export default function Settings(): JSX.Element {
  const shutdown = Shutdown();
  const reboot = Reboot();
  const ipAddress = getIPAddresses()[0];
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
        <ListSubheader disableSticky>System</ListSubheader>
        <Box sx={{ width: '50%' }}>
          <List>
            <ListItem>
              <ListItemText>IP-Adresse</ListItemText>
              <ListItemText>{ipAddress}</ListItemText>
            </ListItem>
          </List>
        </Box>
      </Box>
      {shutdown.dialog}
      {reboot.dialog}
    </div>
  );
}
