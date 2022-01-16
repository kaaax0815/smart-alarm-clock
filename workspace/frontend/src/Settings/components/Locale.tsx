import { Place as PlaceIcon } from '@mui/icons-material';
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
import { all as allLocales } from 'locale-codes';
import { useState } from 'react';

import { useSettings, useUpdateSettings } from '../../hooks/useSettings';

function Locale() {
  const { data: settingsData, status: settingsStatus } = useSettings();
  const updateSettings = useUpdateSettings();
  const [openLocale, setOpenLocale] = useState(false);
  const [locale, setLocale] = useState(settingsData?.locale);
  if (settingsStatus !== 'success') {
    return {
      dialog: null,
      item: null
    };
  }
  function localeClose() {
    setOpenLocale(false);
    updateSettings.mutate({ locale });
  }
  return {
    dialog:
      settingsStatus !== 'success' ? null : (
        <Dialog
          open={openLocale}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Locale</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Current Locale is: {settingsData!.locale}
            </DialogContentText>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Locale</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={locale}
                label="Locale"
                onChange={(ev) => setLocale(ev.target.value as string)}
              >
                {allLocales.map((aLocale, index) => (
                  <MenuItem value={aLocale.tag} key={aLocale.tag + index}>
                    {aLocale.location ? aLocale.name + '/' + aLocale.location : aLocale.name} (
                    {aLocale.tag})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenLocale(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={localeClose} autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      ),
    item: (
      <ListItem
        disablePadding
        onClick={() => {
          setOpenLocale(true);
        }}
      >
        <ListItemButton>
          <ListItemIcon>
            <PlaceIcon />
          </ListItemIcon>
          <ListItemText primary="Locale" />
        </ListItemButton>
      </ListItem>
    )
  };
}

export default Locale;
