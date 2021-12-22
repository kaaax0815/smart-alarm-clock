import './Settings.css';

import {
  Language as TimezoneIcon,
  Place as PlaceIcon,
  PowerSettingsNew as PowerOffIcon,
  RestartAlt as RebootIcon
} from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select
} from '@mui/material';
import { all as allLocales } from 'locale-codes';
import { useContext, useState } from 'react';
import timeZones from 'timezones-list';

import { exec as Iexec } from '../electron/preload';
import SettingsBar from './components/SettingsBar';
import SettingsContext from './contexts/Settings';
import { SocketContext } from './contexts/Socket';

export default function Settings(): JSX.Element {
  const exec = (window as Window & typeof globalThis & Iexec).exec;
  const settingsContext = useContext(SettingsContext);
  const socketContext = useContext(SocketContext);
  // Shutdown Dialog
  const [openShutdown, setOpenShutdown] = useState(false);
  async function shutdownClose() {
    setOpenShutdown(false);
    exec('sudo poweroff');
  }
  // Reboot Dialog
  const [openReboot, setOpenReboot] = useState(false);
  async function rebootClose() {
    setOpenReboot(false);
    exec('sudo reboot');
  }
  // Locale Dialog
  const [openLocale, setOpenLocale] = useState(false);
  const [locale, setLocale] = useState(settingsContext.locale);
  function localeClose() {
    setOpenLocale(false);
    settingsContext.setLocale(locale);
    socketContext.emit('update-value', { type: 'locale', value: locale });
  }
  // Timezone Dialog
  const [openTimezone, setOpenTimezone] = useState(false);
  const [timezone, setTimezone] = useState(settingsContext.timezone);
  async function timezoneClose() {
    setOpenTimezone(false);
    settingsContext.setTimezone(timezone);
    socketContext.emit('update-value', { type: 'timezone', value: timezone });
  }
  return (
    <div className="Settings">
      <SettingsBar />
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <ListSubheader disableSticky>Geographic</ListSubheader>
        <nav aria-label="geographic settings">
          <List>
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
          </List>
        </nav>
        <Divider />
        <ListSubheader disableSticky>Power</ListSubheader>
        <nav aria-label="power options">
          <List>
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
                <ListItemText primary="Shutdown" />
              </ListItemButton>
            </ListItem>
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
          </List>
        </nav>
      </Box>
      <Dialog
        open={openShutdown}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Shutdown</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to shutdown?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenShutdown(false);
            }}
          >
            Disagree
          </Button>
          <Button onClick={shutdownClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
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
              {allLocales.map((aLocale) => (
                <MenuItem value={aLocale.tag}>
                  {aLocale.location ? aLocale.name + '/' + aLocale.location : aLocale.name}
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
              {timeZones.map((timezone) => (
                <MenuItem value={timezone.tzCode}>{timezone.label}</MenuItem>
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
    </div>
  );
}
