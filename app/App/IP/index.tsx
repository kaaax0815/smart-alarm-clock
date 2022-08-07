import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

import ScrollView from '../components/ScrollView';

interface IPProps {
  setIP: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function IP(_props: IPProps) {
  return (
    <ScrollView style={styles.container}>
      <Text>IP</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});
