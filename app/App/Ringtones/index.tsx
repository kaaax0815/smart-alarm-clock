import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';

import RingtoneForm from './RingtoneForm';
import Ringtones from './Ringtones';

const Stack = createStackNavigator();

export type RingtonesParamList = {
  Ringtones: undefined;
  RingtoneForm: undefined;
};

export type Props<T extends keyof RingtonesParamList> = StackScreenProps<
  RingtonesParamList,
  T
>;

export default function RingtonesStack() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Ringtones"
        component={Ringtones}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RingtoneForm"
        component={RingtoneForm}
        options={{
          headerStyle: { backgroundColor: colors.surface },
          headerTitleStyle: { color: colors.text },
          headerTintColor: colors.text,
          title: 'Neuer Klingelton',
        }}
      />
    </Stack.Navigator>
  );
}
