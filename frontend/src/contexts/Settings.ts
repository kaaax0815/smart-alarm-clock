import { createContext } from 'react';

const settingsContext = createContext({
  shown: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setShown: (shown: boolean) => {}
});

export default settingsContext;
