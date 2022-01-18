import { execSync } from 'child_process';

window.exec = execSync;
export type exec = typeof execSync;

declare global {
  interface Window {
    exec: exec;
  }
}
