import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { IconButton, Menu, Text } from 'react-native-paper';
import Sound from 'react-native-sound';

import { SettingsContext } from '../contexts/Settings';
import { useDeleteRingtone } from '../hooks/useRingtones';
import { Ringtone as RingtoneType } from '../utils/api';

type RingtoneProps = {
  ringtone: RingtoneType;
};

export default function Ringtone({ ringtone }: RingtoneProps) {
  const [visible, setVisible] = React.useState(false);
  const deleteRingtone = useDeleteRingtone();
  const settingsContext = React.useContext(SettingsContext);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [playing, setPlaying] = React.useState(false);
  const [sound, setSound] = React.useState<Sound | null>(null);

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

  function handlePlayback() {
    return () => {
      if (playing) {
        sound?.stop();
        sound?.release();
        setPlaying(false);
        return;
      }
      const playback = new Sound(
        `http://${settingsContext.ip}:3535${ringtone.location}`,
        null as unknown as string,
        (error) => {
          if (error) {
            console.warn('SOUND:', 'failed to load the sound', error);
            return;
          }
          playback.play();
          playback.setNumberOfLoops(-1);
          setSound(playback);
          setPlaying(true);
        },
      );
    };
  }

  return (
    <View style={styles.view}>
      <View style={styles.text}>
        <Text style={styles.name}>{ringtone.name}</Text>
      </View>
      <View style={styles.control}>
        <IconButton
          icon={playing ? 'stop' : 'play'}
          onPress={handlePlayback()}
        />
        <Menu
          anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
          visible={visible}
          onDismiss={closeMenu}>
          <Menu.Item onPress={handleEdit()} title="Bearbeiten" icon="pencil" />
          <Menu.Item onPress={handleDelete()} title="Löschen" icon="delete" />
        </Menu>
      </View>
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
