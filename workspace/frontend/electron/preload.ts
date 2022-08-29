import { execSync } from 'child_process';
import * as os from 'os';

window.exec = execSync;
window.os = os;

export type exec = typeof execSync;
export type os = typeof os;

declare global {
  interface Window {
    exec: exec;
    os: os;
  }
}
