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

function Reboot() {
  const [openReboot, setOpenReboot] = useState(false);
  async function rebootClose() {
    setOpenReboot(false);
    window.exec('sudo reboot');
  }
  return {
    dialog: (
      <Dialog
        open={openReboot}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Neu starten</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Möchten Sie wirklich neu starten?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenReboot(false);
            }}
          >
            Ablehnen
          </Button>
          <Button onClick={rebootClose} autoFocus>
            Zustimmen
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
          <ListItemText primary="Neu starten" />
        </ListItemButton>
      </ListItem>
    )
  };
}

export default Reboot;
