import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { IconButton, Menu, Text } from 'react-native-paper';

import { useDeleteRingtone } from '../hooks/useRingtones';
import { Ringtone as RingtoneType } from '../utils/api';

type RingtoneProps = {
  ringtone: RingtoneType;
};

export default function Ringtone({ ringtone }: RingtoneProps) {
  const [visible, setVisible] = React.useState(false);
  const deleteRingtone = useDeleteRingtone();
  const navigation = useNavigation<StackNavigationProp<any>>();
  function openMenu() {
    setVisible(true);
  }
  function closeMenu() {
    setVisible(false);
  }
  function handleDelete() {
    return () => {
      deleteRingtone.mutate({ name: ringtone.name });
      setVisible(false);
    };
  }
  function handleEdit() {
    return () => {
      navigation.navigate('RingtoneForm', {
        edit: true,
        ringtone,
      });
      setVisible(false);
    };
  }
  return (
    <View style={styles.view}>
      <View style={styles.text}>
        <Text style={styles.name}>{ringtone.name}</Text>
      </View>
      {ringtone.name === 'Alarm' || (
        <View style={styles.control}>
          <Menu
            anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
            visible={visible}
            onDismiss={closeMenu}>
            <Menu.Item
              onPress={handleEdit()}
              title="Bearbeiten"
              icon="pencil"
            />
            <Menu.Item onPress={handleDelete()} title="Löschen" icon="delete" />
          </Menu>
        </View>
      )}
    </View>
  );
}

interface Styles {
  view: ViewStyle;
  text: ViewStyle;
  control: ViewStyle;
  name: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  view: {
    flexDirection: 'row',
    padding: 4,
    margin: 2,
    borderRadius: 8,
    backgroundColor: '#18181b',
  },
  text: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 2,
  },
  name: {
    fontSize: 32,
  },
});
