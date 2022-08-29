import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';

import ScrollView from '~/components/ScrollView';
import { useRingtones } from '~/hooks/useRingtones';

import { Props } from './index';
import Ringtone from './Ringtone';

export default function Ringtones({ navigation }: Props<'Ringtones'>) {
  const { data: ringtones, status: ringtonesStatus } = useRingtones();

  if (ringtonesStatus !== 'success') {
    return (
      <ScrollView>
        <ActivityIndicator animating size="large" />
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      {ringtones!.map((ringtone, index) => (
        <Ringtone ringtone={ringtone} key={index + ringtone.name} />
      ))}

      <Button
        style={styles.add}
        icon="plus"
        onPress={() => navigation.navigate('RingtoneForm')}>
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
