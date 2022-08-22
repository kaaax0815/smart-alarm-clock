import { createContext } from 'react';

type Settings = { ip: string | undefined; setIP: (value: string) => void };

export const SettingsContext = createContext<Settings>({} as Settings);
