import './Settings.css';

import {
  Drafts as DraftsIcon,
  Inbox as InboxIcon,
  PowerSettingsNew as PowerOffIcon
} from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@mui/material';
import { useState } from 'react';

import { exec as Iexec } from '../electron/preload';
import SettingsBar from './components/SettingsBar';

export default function Settings(): JSX.Element {
  const exec = (window as Window & typeof globalThis & Iexec).exec;
  const [openShutdown, setOpenShutdown] = useState(false);
  async function shutdownClose() {
    setOpenShutdown(false);
    await exec('sudo poweroff');
  }
  return (
    <div className="Settings">
      <SettingsBar />
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <nav aria-label="geographic settings">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Locale" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Timezone" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
        <ListSubheader disableSticky>Network</ListSubheader>
        <nav aria-label="power options">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ListItemIcon>
                    <PowerOffIcon />
                  </ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Shutdown" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
      <Dialog
        open={openShutdown}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Shutdown</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to shutdown?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenShutdown(false);
            }}
          >
            Disagree
          </Button>
          <Button onClick={shutdownClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
