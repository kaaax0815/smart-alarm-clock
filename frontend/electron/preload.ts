import { execaCommandSync as exec } from 'execa';

(window as Window & typeof globalThis & exec).exec = exec;
export type exec = { exec: typeof exec };
