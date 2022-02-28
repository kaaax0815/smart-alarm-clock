import { Mutex } from 'async-mutex';
import { execSync } from 'child_process';
import { ipcMain as IpcMain } from 'electron';

let keyboardVisible = false;

function setKeyboardVisibility(visible: boolean): void {
  execSync(
    `dbus-send --type=method_call --dest=org.onboard.Onboard /org/onboard/Onboard/Keyboard org.onboard.Onboard.Keyboard.${
      visible ? 'Show' : 'Hide'
    }`
  );
}

export function init(ipcMain: typeof IpcMain) {
  const keyboardMutex = new Mutex();

  ipcMain.on('input-focus', async () => {
    const release = await keyboardMutex.acquire();
    if (!keyboardVisible) {
      setKeyboardVisibility(true);
      keyboardVisible = true;
    }
    release();
  });

  ipcMain.on('input-blur', async () => {
    const release = await keyboardMutex.acquire();
    if (keyboardVisible) {
      setKeyboardVisibility(false);
      keyboardVisible = false;
    }
    release();
  });
}
