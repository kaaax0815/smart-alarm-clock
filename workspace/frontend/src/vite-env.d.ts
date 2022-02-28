/// <reference types="vite/client" />

export {};

declare global {
  interface Window {
    exec: any;
  }
  interface ImportMetaEnv {
    readonly VITE_BACKEND_PORT: string;
    readonly VITE_OPEN_WEATHER_API_KEY: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
