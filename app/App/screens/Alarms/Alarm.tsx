import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { IconButton, Menu, Switch, Text } from 'react-native-paper';

import { useDeleteAlarm } from '~/hooks/useAlarms';
import { Alarm as AlarmType } from '~/utils/api';

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

  const handleDelete = () => {
    deleteAlarm.mutate({ name: alarm.name });
    setVisible(false);
  };

  const handleEdit = () => {
    navigation.navigate('AlarmForm', {
      edit: true,
      alarm,
    });
    setVisible(false);
  };

  function showDays(time: string, days: boolean[]) {
    const isMultipleTrue = days.filter((day) => day === true).length > 1;
    const closestDay = closestDayOfTheWeek(time, days);
    if (!isMultipleTrue) {
      const asWeekday = Days[(days.indexOf(true) + 1) as ValidDays];
      if (asWeekday === closestDay) {
        return [{ day: asWeekday, closest: true }];
      }
      return [{ day: asWeekday }];
    }
    return days.reduce((prev, day, i) => {
      if (!day) {
        return prev;
      }
      const asWeekday = Days[(i + 1) as ValidDays];
      const isClosest = asWeekday === closestDay;
      prev.push({ day: asWeekday.slice(0, 2), closest: isClosest });
      return prev;
    }, [] as { day: string; closest?: boolean }[]);
  }

  /**
   * get closest day of the week start from the beginning if not found
   * @param days boolean[] of length 7 where each index represents a day of the week
   * @returns string day of the week from `Days`
   */
  function closestDayOfTheWeek(time: string, days: boolean[]) {
    // eg: today is 'Mittwoch' and time is '12:00:00'
    const [today, , _now] = new Date()
      .toLocaleString('de-DE', {
        weekday: 'long',
      })
      .split(', ');
    const now = _now.split(':').slice(0, 2).join(':');
    // weird format because of jsc and rn
    const nowDate = new Date(`2022-10-27 ${now}`).getTime();
    const timeDate = new Date(`2022-10-27 ${time}`).getTime();
    // check if alarm is still today
    const timeLater = nowDate > timeDate;
    // calculate the index of the next day of the week the alarm should ring
    const todayIndex = Object.values(Days).indexOf(today) + (timeLater ? 1 : 0);
    const daysAfterToday = days.slice(todayIndex);
    const daysBeforeToday = days.slice(0, todayIndex);
    const daysAfterTodayTrue = daysAfterToday.indexOf(true);
    const daysBeforeTodayTrue = daysBeforeToday.indexOf(true);
    if (daysAfterTodayTrue !== -1) {
      return Days[(daysAfterTodayTrue + todayIndex + 1) as ValidDays];
    }
    return Days[(daysBeforeTodayTrue + 1) as ValidDays];
  }

  return (
    <View style={styles.view}>
      <View style={styles.text}>
        <Text style={styles.name}>{alarm.name}</Text>
        <Text style={styles.time}>{alarm.time}</Text>
        <View style={styles.daysView}>
          {showDays(alarm.time, alarm.days).map(({ day, closest }) => (
            <Text
              key={day}
              style={closest ? [styles.days, styles.daysClosest] : styles.days}>
              {day}{' '}
            </Text>
          ))}
        </View>
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
          <Menu.Item onPress={handleEdit} title="Bearbeiten" icon="pencil" />
          <Menu.Item onPress={handleDelete} title="Löschen" icon="delete" />
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
  daysView: ViewStyle;
  daysClosest: TextStyle;
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
  daysView: {
    flexDirection: 'row',
  },
  daysClosest: {
    color: 'lightblue',
  },
});
