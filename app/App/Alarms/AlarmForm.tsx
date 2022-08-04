import React from 'react';
import { useController, useForm } from 'react-hook-form';
import { ActivityIndicator, Button } from 'react-native-paper';
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
  time: string;
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
        ? alarm.time
        : `${new Date().getHours()}:${new Date().getMinutes()}`,
    },
    mode: 'onChange',
  });
  const ringtoneChoices = React.useMemo(
    () =>
      ringtones?.map(ringtone => ({
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
        ]}
      />
      <Button
        mode={'contained'}
        onPress={formHandleSubmit(onValid => handleSubmit(onValid))}>
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
    ({ hours, minutes }) => {
      setVisible(false);
      field.value = `${hours}:${minutes}`;
    },
    [setVisible, field],
  );
  const time = React.useMemo(() => {
    const [hours, minutes] = field.value.split(':');
    return { hours, minutes };
  }, [field.value]);
  return (
    <>
      <TimePickerModal
        visible={visible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={time.hours}
        minutes={time.minutes}
        label="Zeit auswählen"
        uppercase={false}
        cancelLabel="Abbrechen"
        confirmLabel="Ok"
        animationType="fade"
        locale="de"
      />
      <Button onPress={() => setVisible(true)}>{field.value}</Button>
    </>
  );
}
