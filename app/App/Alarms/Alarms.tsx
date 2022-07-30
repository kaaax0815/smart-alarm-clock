import React from 'react';
import { ScrollView } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';

import { useAlarms, useUpdateAlarm } from '../hooks/useAlarms';
import Alarm from './Alarm';
import { Props } from './index';

export type AlarmsEnabled = { [i: number]: { enabled: boolean } };

export default function Alarms({ navigation }: Props<'Alarms'>) {
  const { data: alarms, status: alarmsStatus } = useAlarms();
  const updateAlarm = useUpdateAlarm();
  const [alarmsEnabled, setAlarmsEnabled] = React.useState<AlarmsEnabled>({});

  // Compute how many alarms are disabled
  const disabled = React.useMemo(
    () =>
      Object.keys(alarmsEnabled).reduce((acc, val) => {
        const enabled =
          alarmsEnabled[val as unknown as keyof AlarmsEnabled].enabled;
        if (enabled === false) {
          return ++acc;
        }
        return acc;
      }, 0),
    [alarmsEnabled],
  );

  // Initialize alarmsEnabled with all alarms
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

  // Check if everything is loaded
  if (
    alarmsStatus !== 'success' ||
    alarmsEnabled[alarms.length - 1] === undefined
  ) {
    return (
      <ScrollView>
        {alarms?.length === 0 ? (
          <Text>Keine Alarme</Text>
        ) : (
          <ActivityIndicator size="large" animating />
        )}
      </ScrollView>
    );
  }

  function handleAlarmsEnabledChange(i: number) {
    return () => {
      updateAlarm.mutate({
        name: alarms![i].name,
        enabled: !alarmsEnabled[i].enabled,
      });
      setAlarmsEnabled({
        ...alarmsEnabled,
        [i]: { enabled: !alarmsEnabled[i].enabled },
      });
    };
  }

  return (
    <ScrollView>
      <Text>Aktiviert</Text>
      {alarms.map(
        (alarm, index) =>
          alarmsEnabled[index].enabled && (
            <Alarm
              {...{ handleAlarmsEnabledChange, alarm, index, alarmsEnabled }}
              key={index + alarm.name}
            />
          ),
      )}
      {disabled === alarms.length && <Text>Keine Alarme aktiviert</Text>}
      <Text>Deaktiviert</Text>
      {alarms.map(
        (alarm, index) =>
          alarmsEnabled[index].enabled || (
            <Alarm
              {...{ handleAlarmsEnabledChange, alarm, index, alarmsEnabled }}
              key={index + alarm.name}
            />
          ),
      )}
      {disabled === 0 && <Text>Keine Alarme deaktiviert</Text>}

      <Button
        icon="plus"
        onPress={() => navigation.navigate('AlarmForm', { edit: false })}>
        Wecker hinzufügen
      </Button>
    </ScrollView>
  );
}
