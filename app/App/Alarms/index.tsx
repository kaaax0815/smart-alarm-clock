import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import { useTheme } from 'native-base';
import React from 'react';

import { Alarm } from '../utils/api';
import AlarmForm from './AlarmForm';
import Alarms from './Alarms';

const Stack = createStackNavigator();

export type AlarmsParamList = {
  Alarms: undefined;
  AlarmForm: AlarmFormPropsEdit | AlarmFormPropsAdd;
};

interface AlarmFormPropsEdit {
  edit: true;
  alarm: Alarm;
}

interface AlarmFormPropsAdd {
  edit: false;
  alarm?: undefined;
}

export type Props<T extends keyof AlarmsParamList> = StackScreenProps<
  AlarmsParamList,
  T
>;

export default function AlarmsStack() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Alarms"
        component={Alarms}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AlarmForm"
        component={AlarmForm}
        options={{
          headerStyle: { backgroundColor: colors.primary['500'] },
          title: 'Neuer Wecker',
        }}
      />
    </Stack.Navigator>
  );
}
