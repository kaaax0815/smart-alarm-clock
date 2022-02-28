import { execSync } from 'child_process';

window.exec = execSync;
export type exec = typeof execSync;

declare global {
  interface Window {
    exec: exec;
  }
}

// Onboard
import { ipcRenderer } from 'electron';
document.addEventListener('DOMContentLoaded', () => {
  const INPUT_TYPE_WHITELIST = [
    'date',
    'datetime',
    'datetime-local',
    'email',
    'month',
    'number',
    'password',
    'search',
    'tel',
    'text',
    'time',
    'url',
    'week'
  ];

  let focused: HTMLInputElement | HTMLTextAreaElement;

  document.addEventListener(
    'focus',
    (e) => {
      if (
        e.target !== null &&
        ((e.target instanceof HTMLInputElement && INPUT_TYPE_WHITELIST.includes(e.target.type)) ||
          e.target instanceof HTMLTextAreaElement) &&
        !e.target.readOnly
      ) {
        focused = e.target;
        ipcRenderer.send('input-focus');
      }
    },
    true
  );

  document.addEventListener(
    'blur',
    (e) => {
      if (e.target === focused) {
        ipcRenderer.send('input-blur');
      }
    },
    true
  );
});
