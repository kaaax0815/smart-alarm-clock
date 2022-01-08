import { commandSync as execa } from 'execa';

window.exec = execa;
export type exec = typeof execa;

declare global {
  interface Window {
    exec: exec;
  }
}
