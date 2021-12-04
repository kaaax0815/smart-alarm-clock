import { exec as _exec } from 'child_process';
import { promisify } from 'util';

const exec = promisify(_exec);
(window as Window & typeof globalThis & exec).exec = exec;
export type exec = { exec: typeof exec };
