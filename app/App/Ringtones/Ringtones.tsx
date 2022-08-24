import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';

import ScrollView from '../components/ScrollView';
import { useRingtones } from '../hooks/useRingtones';
import { Props } from './index';
import Ringtone from './Ringtone';

export default function Ringtones({ navigation }: Props<'RingtoneForm'>) {
  const { data: ringtones, status: ringtonesStatus } = useRingtones();

  // Check if everything is loaded
  if (ringtonesStatus !== 'success') {
    return (
      <ScrollView>
        <ActivityIndicator size="large" animating />
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      {ringtones.map((ringtone, index) => (
        <Ringtone ringtone={ringtone} key={index + ringtone.name} />
      ))}

      <Button
        style={styles.add}
        icon="plus"
        onPress={() => navigation.navigate('RingtoneForm', { edit: false })}>
        Klingelton hinzufügen
      </Button>
    </ScrollView>
  );
}

interface Styles {
  add: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  add: {
    marginBottom: 10,
  },
});