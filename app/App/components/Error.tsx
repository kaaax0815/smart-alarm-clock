import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import RNErrorBoundary from 'react-native-error-boundary';
import { Button, Text } from 'react-native-paper';

import ScrollView from './ScrollView';

export default function ErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RNErrorBoundary FallbackComponent={FallbackComponent}>
      {children}
    </RNErrorBoundary>
  );
}

function FallbackComponent({
  resetError,
  error,
}: {
  resetError: () => void;
  error: Error;
}) {
  return (
    <ScrollView style={styles.content}>
      <Text style={styles.title}>Hoppla!</Text>
      <Text style={styles.subtitle}>Es liegt ein Fehler vor</Text>
      <Text style={styles.error}>{error.toString()}</Text>
      <Button style={styles.button} onPress={resetError}>
        Noch mal versuchen
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: '300',
    paddingBottom: 16,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: '800',
  },
  error: {
    paddingVertical: 16,
  },
  button: {
    padding: 16,
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

type Origins =
  | 'deleteRingtone'
  | 'updateSettings'
  | 'addAlarm'
  | 'deleteAlarm'
  | 'updateAlarm'
  | 'useAlarms'
  | 'useRingtones'
  | 'useSettings';

export function handleError(origin: Origins, e: Error) {
  console.warn('ERROR:', origin, e);

  const alert = (title: string, message: string) =>
    Alert.alert(title, message, [{ text: 'OK' }], {
      cancelable: false,
    });

  switch (origin) {
    case 'deleteRingtone':
      alert('Fehler beim Löschen der Klingeltons', e.message);
      break;
    case 'updateSettings':
      alert('Fehler beim Aktualisieren der Einstellungen', e.message);
      break;
    case 'addAlarm':
      alert('Fehler beim Hinzufügen des Weckers', e.message);
      break;
    case 'deleteAlarm':
      alert('Fehler beim Löschen des Weckers', e.message);
      break;
    case 'updateAlarm':
      alert('Fehler beim Aktualisieren des Weckers', e.message);
      break;
    case 'useAlarms':
      if (e.message === 'Network request failed') {
        alert(
          'Fehler beim Abrufen der Wecker',
          'Bitte überprüfe deine Internetverbindung',
        );
      }
      break;
    case 'useRingtones':
      if (e.message === 'Network request failed') {
        alert(
          'Fehler beim Abrufen der Klingeltöne',
          'Bitte überprüfe deine Internetverbindung',
        );
      }
      break;
    case 'useSettings':
      if (e.message === 'Network request failed') {
        alert(
          'Fehler beim Abrufen der Einstellungen',
          'Bitte überprüfe deine Internetverbindung',
        );
      }
      break;
  }
}
