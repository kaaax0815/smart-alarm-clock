import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

import { init as initOnboard } from './onboard';

const PRODUCTION = process.env.ELECTRON === 'production';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 480,
    frame: PRODUCTION ? false : true,
    kiosk: PRODUCTION ? true : false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      autoplayPolicy: 'no-user-gesture-required'
    }
  });

  if (PRODUCTION) {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  } else {
    win.loadURL('http://localhost:3000/index.html');

    win.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();
  initOnboard(ipcMain);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
});
