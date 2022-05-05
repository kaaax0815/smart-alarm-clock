/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */
import { createContext, ReactNode, useState } from 'react';

import Alarm from '../Alarm/';
import { Alarm as AlarmType } from '../utils/api';

export const popUpContext = createContext({
  popUp: { open: false, alarm: undefined as AlarmType | undefined },
  setPopUp: (popUp: { open: boolean; alarm: AlarmType | undefined }) => {},
  handleAlarm: (alarm: AlarmType) => {}
});

export default function PopUpContext({ children }: { children: ReactNode }): JSX.Element {
  const [popUp, setPopUp] = useState({
    open: false,
    alarm: undefined as AlarmType | undefined
  });
  const handleAlarm = (al: AlarmType) => {
    setPopUp({
      alarm: al,
      open: true
    });
  };
  return (
    <popUpContext.Provider value={{ popUp, setPopUp, handleAlarm }}>
      <Alarm />
      {children}
    </popUpContext.Provider>
  );
}
