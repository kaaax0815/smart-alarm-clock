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
import { useContext, useState } from 'react';

import SettingsContext from '../../contexts/Settings';
import { postAPI, PostEndpoints } from '../../utils/api';

function Locale() {
  const settingsContext = useContext(SettingsContext);
  const [openLocale, setOpenLocale] = useState(false);
  const [locale, setLocale] = useState(settingsContext.locale);
  function localeClose() {
    setOpenLocale(false);
    settingsContext.setLocale(locale);
    postAPI(PostEndpoints.Settings, { locale });
  }
  return {
    dialog: (
      <Dialog
        open={openLocale}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Locale</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Current Locale is: {settingsContext.locale}
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
