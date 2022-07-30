import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';

import Alarms from './Alarms';
import Ringtones from './Ringtones';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Tab.Navigator>
        <Tab.Screen name="AlarmsStack" component={Alarms} />
        <Tab.Screen name="Ringtones" component={Ringtones} />
      </Tab.Navigator>
    </>
  );
}
