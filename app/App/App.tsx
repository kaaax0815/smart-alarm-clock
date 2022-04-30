import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, useColorMode } from 'native-base';
import React from 'react';
import { useColorScheme } from 'react-native';

import Alarms from './Alarms';
import Footer from './components/Footer';
import Ringtones from './Ringtones';

const Tab = createBottomTabNavigator();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const colorMode = useColorMode();
  React.useEffect(() => {
    colorMode.setColorMode(isDarkMode ? 'dark' : 'light');
  }, [colorMode, isDarkMode]);

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Tab.Navigator
        tabBar={props => <Footer {...props} />}
        screenOptions={{ headerShown: false }}>
        <Tab.Screen name="AlarmsStack" component={Alarms} />
        <Tab.Screen name="Ringtones" component={Ringtones} />
      </Tab.Navigator>
    </>
  );
}
