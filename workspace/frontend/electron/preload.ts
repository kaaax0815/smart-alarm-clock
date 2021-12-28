import { commandSync as execa } from 'execa';

(window as Window & typeof globalThis & exec).exec = execa;
export type exec = { exec: typeof execa };
