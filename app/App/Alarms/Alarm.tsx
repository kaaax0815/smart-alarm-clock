import { Icon, Menu, Pressable, Stack, Switch, Text } from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Alarm as AlarmType } from '../hooks/useAlarms';
import { AlarmsEnabled } from './index';

type AlarmProps = {
  alarm: AlarmType;
  handleAlarmsEnabledChange: (i: number) => () => void;
  alarmsEnabled: AlarmsEnabled;
  index: number;
};

export default function Alarm({
  alarm,
  handleAlarmsEnabledChange,
  alarmsEnabled,
  index,
}: AlarmProps) {
  return (
    <Stack direction="row" key={alarm.name} p={1} m={2} borderRadius={'md'}>
      <Stack direction="column" pr="10">
        <Text fontSize={14}>{alarm.name}</Text>
        <Text fontSize={32}>{alarm.time}</Text>
        <Text fontSize={20}>{alarm.days.join(' ')}</Text>
      </Stack>
      <Stack direction="row" alignItems="center" ml="auto" mr={2}>
        <Switch
          isChecked={alarmsEnabled[index].enabled}
          onChange={handleAlarmsEnabledChange(index)}
          mr={2}
        />
        <Menu
          trigger={triggerProps => (
            <Pressable {...triggerProps}>
              <Icon as={MaterialCommunityIcons} name="dots-vertical" size={7} />
            </Pressable>
          )}
          mr={1}>
          <Menu.Item>
            <Stack direction="row">
              <Icon as={MaterialCommunityIcons} name="pencil" size={5} mr={2} />
              <Text>Edit</Text>
            </Stack>
          </Menu.Item>
          <Menu.Item>
            <Stack direction="row">
              <Icon as={MaterialCommunityIcons} name="delete" size={5} mr={2} />
              <Text>Delete</Text>
            </Stack>
          </Menu.Item>
        </Menu>
      </Stack>
    </Stack>
  );
}