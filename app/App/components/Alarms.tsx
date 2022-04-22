import {
  Container,
  Icon,
  Menu,
  Pressable,
  Stack,
  Switch,
  Text,
} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAlarms } from '../hooks/useAlarms';

type AlarmsEnabled = { [i: number]: { enabled: boolean } };

export default function Alarms() {
  const { data: alarms, status: alarmsStatus } = useAlarms();
  const [areAlarmsEnabled, setAlarmsEnabled] = React.useState<AlarmsEnabled>(
    {},
  );
  React.useEffect(() => {
    if (alarmsStatus !== 'success') {
      return;
    }
    const obj: AlarmsEnabled = {};
    alarms.forEach((al, i) => {
      obj[i] = { enabled: al.enabled };
    });
    setAlarmsEnabled(obj);
  }, [alarms, alarmsStatus]);
  if (
    alarmsStatus !== 'success' ||
    areAlarmsEnabled[alarms.length - 1] === undefined
  ) {
    return <Text>Loading Alarms</Text>;
  }
  function handleAlarmsEnabledChange(i: number) {
    return () => {
      setAlarmsEnabled({
        ...areAlarmsEnabled,
        [i]: { enabled: !areAlarmsEnabled[i].enabled },
      });
    };
  }
  return (
    <Container>
      {alarms.map((al, i) => (
        <Stack
          direction="row"
          key={al.name}
          borderColor="primary.500"
          borderStyle="solid"
          borderRadius={5}
          borderWidth={2}>
          <Stack direction="column" pr="10">
            <Text fontSize={14}>{al.name}</Text>
            <Text fontSize={32}>{al.time}</Text>
            <Text fontSize={20}>{al.days.join(' ')}</Text>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Switch
              isChecked={areAlarmsEnabled[i].enabled}
              onChange={handleAlarmsEnabledChange(i)}
            />
            <Menu
              trigger={triggerProps => (
                <Pressable {...triggerProps}>
                  <Icon
                    as={MaterialCommunityIcons}
                    name="dots-vertical"
                    size={5}
                  />
                </Pressable>
              )}>
              <Menu.Item>
                <Stack direction="row">
                  <Icon as={MaterialCommunityIcons} name="pencil" size={5} />
                  <Text>Edit</Text>
                </Stack>
              </Menu.Item>
              <Menu.Item>
                <Stack direction="row">
                  <Icon as={MaterialCommunityIcons} name="delete" size={5} />
                  <Text>Delete</Text>
                </Stack>
              </Menu.Item>
            </Menu>
          </Stack>
        </Stack>
      ))}
    </Container>
  );
}
