/// <reference types="vite/client" />

import { exec as Iexec } from '../electron/preload';

declare global {
  interface Window {
    exec: Iexec;
  }
  interface ImportMetaEnv {
    readonly VITE_BACKEND_PORT: string;
    readonly VITE_OPEN_WEATHER_API_KEY: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
