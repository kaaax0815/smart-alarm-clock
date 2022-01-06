import { RestartAlt as RebootIcon } from '@mui/icons-material';
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

import { exec as Iexec } from '../../../electron/preload';

function Reboot() {
  const exec = (window as Window & typeof globalThis & Iexec).exec;
  const [openReboot, setOpenReboot] = useState(false);
  async function rebootClose() {
    setOpenReboot(false);
    exec('sudo reboot');
  }
  return {
    dialog: (
      <Dialog
        open={openReboot}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Reboot</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to reboot?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenReboot(false);
            }}
          >
            Disagree
          </Button>
          <Button onClick={rebootClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    ),
    item: (
      <ListItem
        disablePadding
        onClick={() => {
          setOpenReboot(true);
        }}
      >
        <ListItemButton>
          <ListItemIcon>
            <RebootIcon />
          </ListItemIcon>
          <ListItemText primary="Reboot" />
        </ListItemButton>
      </ListItem>
    )
  };
}

export default Reboot;
