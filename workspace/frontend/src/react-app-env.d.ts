/// <reference types="react-scripts" />
import { exec as IExec } from '../electron/preload';

export declare global {
  interface Window {
    exec: IExec;
  }
}
