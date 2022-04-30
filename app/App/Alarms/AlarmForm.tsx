import {
  Button,
  Checkbox,
  FormControl,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Select,
} from 'native-base';
import React from 'react';
import DatePicker from 'react-native-date-picker';

export default function AlarmForm() {
  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <FormControl isRequired>
          <FormControl.Label>Name</FormControl.Label>
          <Input placeholder="Wecker" />
          <FormControl.ErrorMessage>
            Bitte einen Namen eingeben
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label>Klingelton</FormControl.Label>
          <Select>
            <Select.Item label="Alarm" value="Alarm" />
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
            date={new Date()}
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
          <Checkbox value="1">Montag</Checkbox>
          <Checkbox value="2">Dienstag</Checkbox>
          <Checkbox value="3">Mittwoch</Checkbox>
          <Checkbox value="4">Donnerstag</Checkbox>
          <Checkbox value="5">Freitag</Checkbox>
          <Checkbox value="6">Samstag</Checkbox>
          <Checkbox value="7">Sonntag</Checkbox>
          <FormControl.ErrorMessage>
            Bitte Tage auswählen
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label>Aktiviert</FormControl.Label>
          <Checkbox value="true" accessibilityLabel="Aktiviert" />
          <FormControl.ErrorMessage>Bitte auswählen</FormControl.ErrorMessage>
        </FormControl>
        <Button>Hinzufügen</Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
