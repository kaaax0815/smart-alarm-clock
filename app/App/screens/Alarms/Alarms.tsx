import React from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { ActivityIndicator, Button, Text } from 'react-native-paper';

import ScrollView from '~/components/ScrollView';
import { useAlarms, useUpdateAlarm } from '~/hooks/useAlarms';

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

  // Hide Splash Screen when done
  React.useEffect(() => {
    if (alarmsStatus === 'success' || alarmsStatus === 'error') {
      RNBootSplash.hide();
    }
  }, [alarmsStatus]);

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

  if (
    alarmsStatus !== 'success' ||
    (alarms.length > 0 && alarmsEnabled[alarms.length - 1] === undefined)
  ) {
    return (
      <ScrollView>
        <ActivityIndicator animating size="large" />
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      <Text style={styles.text}>Aktiviert</Text>
      {alarms.map(
        (alarm, index) =>
          alarmsEnabled[index].enabled && (
            <Alarm
              {...{ handleAlarmsEnabledChange, alarm, index, alarmsEnabled }}
              key={index + alarm.name}
            />
          ),
      )}
      {disabled === alarms!.length && <Text>Keine Alarme aktiviert</Text>}
      <Text style={[styles.text, styles.deactivated]}>Deaktiviert</Text>
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
        style={styles.add}
        icon="plus"
        onPress={() => navigation.navigate('AlarmForm', { edit: false })}>
        Wecker hinzufügen
      </Button>
    </ScrollView>
  );
}

interface Styles {
  text: TextStyle;
  deactivated: TextStyle;
  add: ViewStyle;
  errorText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  text: {
    fontSize: 12,
    fontWeight: '300',
    color: '#ccc',
  },
  deactivated: {
    marginTop: 10,
  },
  add: {
    marginBottom: 10,
  },
  errorText: {
    textAlign: 'center',
  },
});
