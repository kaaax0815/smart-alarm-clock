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
        <DialogTitle id="alert-dialog-title">Timezone</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Current Timezone is: {settingsData!.timezone}
          </DialogContentText>
          <FormControl fullWidth>
            <InputLabel id="select-timezone-label">Timezone</InputLabel>
            <Select
              labelId="select-timezone-label"
              id="select-timezone"
              value={timezone}
              label="Timezone"
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
            Cancel
          </Button>
          <Button onClick={timezoneClose} autoFocus>
            Save
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
          <ListItemText primary="Timezone" />
        </ListItemButton>
      </ListItem>
    )
  };
}

export default Timezone;
