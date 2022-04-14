import { Language as TimezoneIcon } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select
} from '@mui/material';
import { useState } from 'react';
import timeZones from 'timezones-list';

import { useSettings, useUpdateSettings } from '../../hooks/useSettings';

function Timezone() {
  const { data: settingsData, status: settingsStatus } = useSettings();
  const updateSettings = useUpdateSettings();
  const [openTimezone, setOpenTimezone] = useState(false);
  const [timezone, setTimezone] = useState(settingsData?.timezone);
  if (settingsStatus !== 'success') {
    return {
      dialog: null,
      item: null
    };
  }
  if (!timezone) {
    setTimezone(settingsData!.timezone);
  }
  async function timezoneClose() {
    setOpenTimezone(false);
    updateSettings.mutate({ timezone });
  }
  return {
    dialog: (
      <Dialog
        open={openTimezone}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Zeitzone</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Aktuelle Zeitzone ist: {settingsData!.timezone}
          </DialogContentText>
          <FormControl fullWidth>
            <InputLabel id="select-timezone-label">Zeitzone</InputLabel>
            <Select
              labelId="select-timezone-label"
              id="select-timezone"
              value={timezone}
              label="Zeitzone"
              onChange={(ev) => setTimezone(ev.target.value as string)}
            >
              {timeZones.map((timezone, index) => (
                <MenuItem value={timezone.tzCode} key={timezone.tzCode + index}>
                  {timezone.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenTimezone(false);
            }}
          >
            Abbrechen
          </Button>
          <Button onClick={timezoneClose} autoFocus>
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
    ),
    item: (
      <ListItem
        disablePadding
        onClick={() => {
          setOpenTimezone(true);
        }}
      >
        <ListItemButton>
          <ListItemIcon>
            <TimezoneIcon />
          </ListItemIcon>
          <ListItemText primary="Zeitzone" />
        </ListItemButton>
      </ListItem>
    )
  };
}

export default Timezone;
