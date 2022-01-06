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
import { countries } from 'country-code-lookup';
import { useContext, useState } from 'react';

import SettingsContext from '../../contexts/Settings';
import { SocketContext } from '../../contexts/Socket';

function Location() {
  const settingsContext = useContext(SettingsContext);
  const socketContext = useContext(SocketContext);
  const [openLocation, setOpenLocation] = useState(false);
  const [city, setCity] = useState(settingsContext.location.city);
  const [countryCode, setCountryCode] = useState(settingsContext.location.countryCode);
  async function locationClose() {
    setOpenLocation(false);
    socketContext.emit('update-value', { type: 'location', value: { city, countryCode } });
  }
  return {
    dialog: (
      <Dialog
        open={openLocation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Location</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Current Country Code is: {settingsContext.location.countryCode}
          </DialogContentText>
          <FormControl fullWidth>
            <InputLabel id="select-location-cc-label">Country Code</InputLabel>
            <Select
              labelId="select-location-cc-label"
              id="select-location-cc"
              value={countryCode}
              label="Country Code"
              onChange={(ev) => setCountryCode(ev.target.value as string)}
            >
              {countries.map((country, index) => (
                <MenuItem value={country.iso2} key={country.iso2 + index}>
                  {country.country} ({country.iso2})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenLocation(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={locationClose} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    ),
    item: (
      <ListItem
        disablePadding
        onClick={() => {
          setOpenLocation(true);
        }}
      >
        <ListItemButton>
          <ListItemIcon>
            <TimezoneIcon />
          </ListItemIcon>
          <ListItemText primary="Location" />
        </ListItemButton>
      </ListItem>
    )
  };
}

export default Location;
