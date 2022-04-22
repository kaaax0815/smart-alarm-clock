import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { ScrollView, StatusBar, useColorScheme, View } from 'react-native';

import Alarms from './components/Alarms';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NativeBaseProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Alarms />
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
}
