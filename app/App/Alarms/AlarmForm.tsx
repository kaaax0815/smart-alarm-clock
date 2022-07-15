import {
  Button,
  Center,
  Checkbox,
  FormControl,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Select,
  Spinner,
} from 'native-base';
import React from 'react';
import DatePicker from 'react-native-date-picker';

import { useAddAlarm, useUpdateAlarm } from '../hooks/useAlarms';
import { useRingtones } from '../hooks/useRingtones';
import { Props } from './index';

export default function AlarmForm({ navigation, route }: Props<'AlarmForm'>) {
  const { alarm, edit } = route.params;
  const [days, setDays] = React.useState<number[]>(edit ? alarm.days : []);
  const [name, setName] = React.useState(edit ? alarm.name : '');
  const [ringtone, setRingtone] = React.useState(edit ? alarm.ringtone : '');
  const date = new Date();
  const { data: ringtones, status: ringtonesStatus } = useRingtones();
  if (edit) {
    date.setHours(
      Number.parseInt(alarm.time.split(':')[0], 10),
      Number.parseInt(alarm.time.split(':')[1], 10),
    );
  }
  const [time, setTime] = React.useState(date);
  const [enabled, setEnabled] = React.useState(edit ? alarm.enabled : true);
  const addAlarm = useAddAlarm();
  const updateAlarm = useUpdateAlarm();
  if (ringtonesStatus !== 'success') {
    return (
      <ScrollView>
        <Center>
          <Spinner size={25} mt={2} />
        </Center>
      </ScrollView>
    );
  }
  function handleDaysCheck(value: number) {
    return (isSelected: boolean) => {
      if (isSelected) {
        setDays([...days, value]);
      } else {
        setDays(days.filter(day => day !== value));
      }
    };
  }
  function handleSubmit() {
    return () => {
      edit
        ? updateAlarm.mutate({
            name,
            days,
            ringtone,
            time: time.toTimeString().substring(0, 5),
            enabled,
          })
        : addAlarm.mutate({
            name,
            days,
            ringtone,
            time: time.toTimeString().substring(0, 5),
            enabled,
          });
      navigation.navigate('Alarms');
    };
  }
  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <FormControl isRequired>
          <FormControl.Label>Name</FormControl.Label>
          <Input
            placeholder="Wecker"
            value={name}
            isDisabled={edit}
            onChangeText={text => setName(text)}
          />
          <FormControl.ErrorMessage>
            Bitte einen Namen eingeben
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label>Klingelton</FormControl.Label>
          <Select
            onValueChange={item => setRingtone(item)}
            selectedValue={ringtone}>
            {ringtones.map(val => (
              <Select.Item label={val.name} value={val.name} key={val.name} />
            ))}
          </Select>
          <FormControl.ErrorMessage>
            Bitte einen Klingelton auswählen
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label>Uhrzeit</FormControl.Label>
          <DatePicker
            mode="time"
            locale="de"
            date={time}
            onDateChange={val => setTime(val)}
            fadeToColor="#ffffff"
            is24hourSource="locale"
            androidVariant="nativeAndroid"
          />
          <FormControl.ErrorMessage>
            Bitte eine Uhrzeit auswählen
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label>Tage</FormControl.Label>
          <Checkbox
            isChecked={days.includes(1)}
            value="1"
            onChange={handleDaysCheck(1)}>
            Montag
          </Checkbox>
          <Checkbox
            value="2"
            isChecked={days.includes(2)}
            onChange={handleDaysCheck(2)}>
            Dienstag
          </Checkbox>
          <Checkbox
            value="3"
            isChecked={days.includes(3)}
            onChange={handleDaysCheck(3)}>
            Mittwoch
          </Checkbox>
          <Checkbox
            value="4"
            isChecked={days.includes(4)}
            onChange={handleDaysCheck(4)}>
            Donnerstag
          </Checkbox>
          <Checkbox
            value="5"
            isChecked={days.includes(5)}
            onChange={handleDaysCheck(5)}>
            Freitag
          </Checkbox>
          <Checkbox
            value="6"
            isChecked={days.includes(6)}
            onChange={handleDaysCheck(6)}>
            Samstag
          </Checkbox>
          <Checkbox
            value="7"
            isChecked={days.includes(7)}
            onChange={handleDaysCheck(7)}>
            Sonntag
          </Checkbox>
          <FormControl.ErrorMessage>
            Bitte Tage auswählen
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label>Aktiviert</FormControl.Label>
          <Checkbox
            value="true"
            accessibilityLabel="Aktiviert"
            isChecked={enabled}
            onChange={val => setEnabled(val)}
          />
          <FormControl.ErrorMessage>Bitte auswählen</FormControl.ErrorMessage>
        </FormControl>
        <Button onPress={handleSubmit()} _stack={{ bg: 'primary.600' }}>
          {edit ? 'Speichern' : 'Hinzufügen'}
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
