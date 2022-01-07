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
import { useContext, useState } from 'react';
import timeZones from 'timezones-list';

import SettingsContext from '../../contexts/Settings';
import { postAPI, PostEndpoints } from '../../utils/api';

function Timezone() {
  const settingsContext = useContext(SettingsContext);

  const [openTimezone, setOpenTimezone] = useState(false);
  const [timezone, setTimezone] = useState(settingsContext.timezone);
  async function timezoneClose() {
    setOpenTimezone(false);
    settingsContext.setTimezone(timezone);
    postAPI(PostEndpoints.Settings, { timezone });
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
            Current Timezone is: {settingsContext.timezone}
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
