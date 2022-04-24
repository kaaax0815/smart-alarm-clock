import { Center, ScrollView, Spinner, Text } from 'native-base';
import React from 'react';

import { useAlarms } from '../hooks/useAlarms';
import Alarm from './Alarm';

export type AlarmsEnabled = { [i: number]: { enabled: boolean } };

export default function Alarms() {
  const { data: alarms, status: alarmsStatus } = useAlarms();
  const [alarmsEnabled, setAlarmsEnabled] = React.useState<AlarmsEnabled>({});

  // Compute how many alarms are disabled
  const disabled = React.useMemo(
    () =>
      Object.keys(alarmsEnabled).reduce((acc, val) => {
        const enabled =
          alarmsEnabled[val as unknown as keyof AlarmsEnabled].enabled;
        console.log({ enabled, acc, val });
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
        <Center>
          {alarms?.length === 0 ? (
            <Text>Keine Alarme</Text>
          ) : (
            <Spinner size={25} mt={2} />
          )}
        </Center>
      </ScrollView>
    );
  }

  function handleAlarmsEnabledChange(i: number) {
    return () => {
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
            />
          ),
      )}
      {disabled === 0 && <Text>Keine Alarme deaktiviert</Text>}
    </ScrollView>
  );
}
