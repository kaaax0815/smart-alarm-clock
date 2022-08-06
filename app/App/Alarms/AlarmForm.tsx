import React from 'react';
import { useController, useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Checkbox,
  List,
  useTheme,
} from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import { FormBuilder } from 'react-native-paper-form-builder';
import { LogicProps } from 'react-native-paper-form-builder/dist/Types/Types';

import ScrollView from '../components/ScrollView';
//import { useAddAlarm, useUpdateAlarm } from '../hooks/useAlarms';
import { useRingtones } from '../hooks/useRingtones';
import { Props } from './index';

interface FormSubmitValues {
  name: string;
  ringtone: string;
  time: { hours: number; minutes: number };
  days: boolean[];
  enabled: true;
}

export default function AlarmForm({
  navigation: _,
  route,
}: Props<'AlarmForm'>) {
  const { alarm, edit } = route.params;
  const { data: ringtones, status: ringtonesStatus } = useRingtones();
  const {
    control,
    setFocus,
    handleSubmit: formHandleSubmit,
  } = useForm<FormSubmitValues>({
    defaultValues: {
      name: edit ? alarm.name : '',
      ringtone: edit ? alarm.ringtone : '',
      time: edit
        ? {
            hours: Number.parseInt(alarm.time.split(':')[0], 10)!,
            minutes: Number.parseInt(alarm.time.split(':')[1], 10)!,
          }
        : { hours: new Date().getHours(), minutes: new Date().getMinutes() },
      days: edit
        ? alarm.days
        : [false, false, false, false, false, false, false],
      enabled: true,
    },
    mode: 'onChange',
  });
  const ringtoneChoices = React.useMemo(
    () =>
      ringtones?.map((ringtone) => ({
        label: ringtone.name,
        value: ringtone.name,
      })),
    [ringtones],
  );
  function handleSubmit(values: FormSubmitValues) {
    console.log(values);
  }
  if (ringtonesStatus !== 'success') {
    return (
      <ScrollView>
        <ActivityIndicator size="large" animating />
      </ScrollView>
    );
  }
  return (
    <ScrollView>
      <FormBuilder
        control={control}
        setFocus={setFocus}
        formConfigArray={[
          {
            type: 'text',
            name: 'name',
            rules: {
              required: { value: true, message: 'Bitte einen Namen angeben' },
            },
            textInputProps: {
              label: 'Name',
            },
          },
          {
            type: 'select',
            name: 'ringtone',
            rules: {
              required: {
                value: true,
                message: 'Bitte einen Klingelton auswählen',
              },
            },
            options: ringtoneChoices,
          },
          {
            type: 'custom',
            name: 'time',
            JSX: CustomTimePicker,
          },
          {
            type: 'custom',
            name: 'days',
            JSX: CustomDaysPicker,
          },
          { type: 'custom', name: 'enabled', JSX: CustomEnabledCheckBox },
        ]}
      />
      <Button
        mode="contained"
        onPress={formHandleSubmit((onValid) => handleSubmit(onValid))}>
        {edit ? 'Speichern' : 'Hinzufügen'}
      </Button>
    </ScrollView>
  );
}

function CustomTimePicker(props: LogicProps) {
  const { field } = useController(props);
  const [visible, setVisible] = React.useState(false);
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);
  const onConfirm = React.useCallback(
    ({ hours, minutes }: { hours: number; minutes: number }) => {
      setVisible(false);
      field.onChange({ hours, minutes });
    },
    [setVisible, field],
  );
  return (
    <>
      <TimePickerModal
        visible={visible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={field.value.hours}
        minutes={field.value.minutes}
        label="Zeit auswählen"
        uppercase={false}
        cancelLabel="Abbrechen"
        confirmLabel="Ok"
        animationType="fade"
        locale="de"
      />
      <Button onPress={() => setVisible(true)}>
        {field.value.hours.toString().padStart(2, '0')}:
        {field.value.minutes.toString().padStart(2, '0')}
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  CustomDaysPicker: {
    flexDirection: 'row',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
  },
});

function CustomDaysPicker(props: LogicProps) {
  const { field } = useController(props);
  const [enabled, setEnabled] = React.useState<boolean[]>(field.value);
  function handleClick(i: number) {
    return () => {
      setEnabled((prev) => {
        const newEnabled = [...prev];
        newEnabled[i] = !newEnabled[i];
        field.onChange(newEnabled);
        return newEnabled;
      });
    };
  }
  return (
    <View style={styles.CustomDaysPicker}>
      <DaysPickerButton
        title="Mo"
        onPress={handleClick(0)}
        active={enabled[0]}
      />
      <DaysPickerButton
        title="Di"
        onPress={handleClick(1)}
        active={enabled[1]}
      />
      <DaysPickerButton
        title="Mi"
        onPress={handleClick(2)}
        active={enabled[2]}
      />
      <DaysPickerButton
        title="Do"
        onPress={handleClick(3)}
        active={enabled[3]}
      />
      <DaysPickerButton
        title="Fr"
        onPress={handleClick(4)}
        active={enabled[4]}
      />
      <DaysPickerButton
        title="Sa"
        onPress={handleClick(5)}
        active={enabled[5]}
      />
      <DaysPickerButton
        title="So"
        onPress={handleClick(6)}
        active={enabled[6]}
      />
    </View>
  );
}

function DaysPickerButton({
  onPress,
  title,
  active,
}: {
  onPress: () => void;
  title: string;
  active?: boolean;
}) {
  const { colors } = useTheme();
  const buttonStyles = StyleSheet.create({
    // ...
    appButtonContainer: {
      elevation: 8,
      backgroundColor: active ? colors.primary : 'transparent',
      borderRadius: 100,
      padding: 0,
      width: '13%',
      aspectRatio: 1,
      borderColor: colors.primary,
      borderWidth: 1.5,
      justifyContent: 'center',
    },
    appButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      alignSelf: 'center',
    },
  });
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles.appButtonContainer}>
      <Text style={buttonStyles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

function CustomEnabledCheckBox(props: LogicProps) {
  const { field } = useController(props);
  return (
    <List.Item
      title={'Aktiviert'}
      right={() => (
        <Checkbox
          status={field.value ? 'checked' : 'unchecked'}
          onPress={() => {
            field.onChange(!field.value);
          }}
        />
      )}
    />
  );
}
