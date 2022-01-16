import { LocationOn as LocationIcon } from '@mui/icons-material';
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
  Select,
  TextField
} from '@mui/material';
import { countries } from 'country-code-lookup';
import { useState } from 'react';

import { useSettings, useUpdateSettings } from '../../hooks/useSettings';

function Location() {
  const updateSettings = useUpdateSettings();
  const { data: settingsData, status: settingsStatus } = useSettings();
  const [openLocation, setOpenLocation] = useState(false);
  const [city, setCity] = useState(settingsData?.location.city);
  const [countryCode, setCountryCode] = useState(settingsData?.location.countryCode);
  if (settingsStatus !== 'success') {
    return {
      dialog: null,
      item: null
    };
  }
  async function locationClose() {
    updateSettings.mutate({ location: { city: city || '', countryCode: countryCode || '' } });
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
            Current Country Code is: {settingsData!.location.countryCode}
            <br />
            Current City is: {settingsData!.location.city}
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
            <TextField
              id="select-location-city"
              label="City"
              value={city}
              onChange={(ev) => setCity(ev.target.value as string)}
            />
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
            <LocationIcon />
          </ListItemIcon>
          <ListItemText primary="Location" />
        </ListItemButton>
      </ListItem>
    )
  };
}

export default Location;
