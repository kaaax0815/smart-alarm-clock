import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';

import { SettingsContext } from '~/contexts/Settings';
import {
  AlarmsScreen,
  IPScreen,
  RingtonesScreen,
  SettingsScreen,
} from '~/screens';

import ErrorBoundary from './components/Error';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const settingsContext = React.useContext(SettingsContext);

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {settingsContext.ip ? (
        <Tab.Navigator>
          <Tab.Screen name="Wecker" options={{ tabBarIcon: 'alarm' }}>
            {() => (
              <ErrorBoundary>
                <AlarmsScreen />
              </ErrorBoundary>
            )}
          </Tab.Screen>
          <Tab.Screen name="Klingeltöne" options={{ tabBarIcon: 'bell' }}>
            {() => (
              <ErrorBoundary>
                <RingtonesScreen />
              </ErrorBoundary>
            )}
          </Tab.Screen>
          <Tab.Screen name="Einstellungen" options={{ tabBarIcon: 'cog' }}>
            {() => (
              <ErrorBoundary>
                <SettingsScreen />
              </ErrorBoundary>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      ) : (
        <ErrorBoundary>
          <IPScreen />
        </ErrorBoundary>
      )}
    </>
  );
}
