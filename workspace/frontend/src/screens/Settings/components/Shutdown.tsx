import { PowerSettingsNew as PowerOffIcon } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useState } from 'react';

function Shutdown() {
  const [openShutdown, setOpenShutdown] = useState(false);
  async function shutdownClose() {
    setOpenShutdown(false);
    window.exec('sudo poweroff');
  }
  return {
    dialog: (
      <Dialog
        open={openShutdown}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Herunterfahren</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Möchten Sie wirklich herunterfahren?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenShutdown(false);
            }}
          >
            Ablehnen
          </Button>
          <Button onClick={shutdownClose} autoFocus>
            Zustimmen
          </Button>
        </DialogActions>
      </Dialog>
    ),
    item: (
      <ListItem
        disablePadding
        onClick={() => {
          setOpenShutdown(true);
        }}
      >
        <ListItemButton>
          <ListItemIcon>
            <PowerOffIcon />
          </ListItemIcon>
          <ListItemText primary="Herunterfahren" />
        </ListItemButton>
      </ListItem>
    )
  };
}

export default Shutdown;
