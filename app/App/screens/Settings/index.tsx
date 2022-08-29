import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ActivityIndicator,
  List,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import ScrollView from '~/components/ScrollView';
import { SettingsContext } from '~/contexts/Settings';
import { useSettings } from '~/hooks/useSettings';

import { IPAddressDialog, LocationDialog, TimezoneDialog } from './dialogs';

export default function Settings() {
  const { data: settingsData, status: settingsStatus } = useSettings();
  const settingsContext = React.useContext(SettingsContext);
  const [ipVisible, setIPVisible] = React.useState(false);
  const [tzVisible, setTZVisible] = React.useState(false);
  const [locVisible, setLocVisible] = React.useState(false);

  if (settingsStatus !== 'success') {
    return (
      <ScrollView>
        <ActivityIndicator animating size="large" />
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      <IPAddressDialog visible={ipVisible} setVisible={setIPVisible} />
      <List.Item
        title="IP-Adresse"
        right={() => <Text style={styles.text}>{settingsContext.ip!}</Text>}
        onPress={() => setIPVisible(true)}
      />
      <TimezoneDialog visible={tzVisible} setVisible={setTZVisible} />
      <List.Item
        title="Zeitzone"
        right={() => <Text style={styles.text}>{settingsData!.timezone}</Text>}
        onPress={() => setTZVisible(true)}
      />
      <LocationDialog visible={locVisible} setVisible={setLocVisible} />
      <List.Section title="Position">
        <TouchableRipple onPress={() => setLocVisible(true)}>
          <>
            <List.Item
              title="Stadt"
              right={() => (
                <Text style={styles.text}>{settingsData!.location.city}</Text>
              )}
            />
            <List.Item
              title="Ländercode"
              right={() => (
                <Text style={styles.text}>
                  {settingsData!.location.countryCode}
                </Text>
              )}
            />
          </>
        </TouchableRipple>
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    textAlignVertical: 'center',
  },
});
