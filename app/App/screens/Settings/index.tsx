import React from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, List, Text } from 'react-native-paper';

import ScrollView from '~/components/ScrollView';
import { SettingsContext } from '~/contexts/Settings';
import { useSettings } from '~/hooks/useSettings';

import IPAddress from './dialogs/IPAddress';

export default function Settings() {
  const { data: settingsData, status: settingsStatus } = useSettings();
  const settingsContext = React.useContext(SettingsContext);
  const [ipVisible, setIPVisible] = React.useState(false);

  if (settingsStatus !== 'success') {
    return (
      <ScrollView>
        <ActivityIndicator size="large" animating />
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      <IPAddress visible={ipVisible} setVisible={setIPVisible} />
      <List.Item
        title="IP-Adresse"
        right={() => <Text style={styles.text}>{settingsContext.ip!}</Text>}
        onPress={() => setIPVisible(true)}
      />
      <List.Item
        title="Zeitzone"
        right={() => <Text style={styles.text}>{settingsData.timezone}</Text>}
      />
      <List.Section title="Position">
        <List.Item
          title="Stadt"
          right={() => (
            <Text style={styles.text}>{settingsData.location.city}</Text>
          )}
        />
        <List.Item
          title="Ländercode"
          right={() => (
            <Text style={styles.text}>{settingsData.location.countryCode}</Text>
          )}
        />
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
