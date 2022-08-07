import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';

import Alarms from './Alarms';
import IP from './IP';
import Ringtones from './Ringtones';

const Tab = createMaterialBottomTabNavigator();

interface AppProps {
  ip: string | undefined;
  setIP: (value: string) => void;
}

export default function App({ ip, setIP }: AppProps) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {ip ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Wecker"
            component={Alarms}
            options={{ tabBarIcon: 'alarm' }}
          />
          <Tab.Screen
            name="Klingeltöne"
            component={Ringtones}
            options={{ tabBarIcon: 'bell' }}
          />
        </Tab.Navigator>
      ) : (
        <IP setIP={setIP} />
      )}
    </>
  );
}
