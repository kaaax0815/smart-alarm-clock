import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';

import { SettingsContext } from './contexts/Settings';
import {
  AlarmsScreen,
  IPScreen,
  RingtonesScreen,
  SettingsScreen,
} from './screens';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const settingsContext = React.useContext(SettingsContext);

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {settingsContext.ip ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Wecker"
            component={AlarmsScreen}
            options={{ tabBarIcon: 'alarm' }}
          />
          <Tab.Screen
            name="Klingeltöne"
            component={RingtonesScreen}
            options={{ tabBarIcon: 'bell' }}
          />
          <Tab.Screen
            name="Einstellungen"
            component={SettingsScreen}
            options={{ tabBarIcon: 'cog' }}
          />
        </Tab.Navigator>
      ) : (
        <IPScreen />
      )}
    </>
  );
}
