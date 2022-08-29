import React from 'react';
import { StyleSheet } from 'react-native';
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
