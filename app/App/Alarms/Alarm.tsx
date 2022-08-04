import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { IconButton, Menu, Switch, Text } from 'react-native-paper';

import { useDeleteAlarm } from '../hooks/useAlarms';
import { Alarm as AlarmType } from '../utils/api';
import { AlarmsEnabled } from './Alarms';

type AlarmProps = {
  alarm: AlarmType;
  handleAlarmsEnabledChange: (i: number) => () => void;
  alarmsEnabled: AlarmsEnabled;
  index: number;
};

const Days = {
  1: 'Montag',
  2: 'Dienstag',
  3: 'Mittwoch',
  4: 'Donnerstag',
  5: 'Freitag',
  6: 'Samstag',
  7: 'Sonntag',
};

type ValidDays = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export default function Alarm({
  alarm,
  handleAlarmsEnabledChange,
  alarmsEnabled,
  index,
}: AlarmProps) {
  const [visible, setVisible] = React.useState(false);
  const deleteAlarm = useDeleteAlarm();
  const navigation = useNavigation<StackNavigationProp<any>>();
  function openMenu() {
    setVisible(true);
  }
  function closeMenu() {
    setVisible(false);
  }
  function handleDelete() {
    return () => {
      deleteAlarm.mutate({ name: alarm.name });
    };
  }
  function handleEdit() {
    return () => {
      navigation.navigate('AlarmForm', {
        edit: true,
        alarm,
      });
    };
  }
  function showDays(days: ValidDays[]) {
    if (days.length === 1) {
      return Days[days[0]];
    }
    return days
      .sort()
      .map((day) => Days[day].slice(0, 2))
      .join(' ');
  }
  return (
    <View style={styles.view}>
      <View style={styles.text}>
        <Text style={styles.name}>{alarm.name}</Text>
        <Text style={styles.time}>{alarm.time}</Text>
        <Text style={styles.days}>{showDays(alarm.days as ValidDays[])}</Text>
      </View>
      <View style={styles.control}>
        <Switch
          value={alarmsEnabled[index].enabled}
          onValueChange={handleAlarmsEnabledChange(index)}
        />
        <Menu
          anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
          visible={visible}
          onDismiss={closeMenu}>
          <Menu.Item onPress={handleEdit()} title="Bearbeiten" />
          <Menu.Item onPress={handleDelete()} title="Löschen" />
        </Menu>
      </View>
    </View>
  );
}

interface Styles {
  view: ViewStyle;
  text: ViewStyle;
  control: ViewStyle;
  name: TextStyle;
  time: TextStyle;
  days: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  view: {
    flexDirection: 'row',
    padding: 4,
    margin: 2,
    borderRadius: 8,
    backgroundColor: '#18181b',
  },
  text: {
    flexDirection: 'column',
    paddingRight: 10,
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 2,
  },
  name: {
    fontSize: 14,
  },
  time: {
    fontSize: 32,
  },
  days: {
    fontSize: 18,
  },
});
