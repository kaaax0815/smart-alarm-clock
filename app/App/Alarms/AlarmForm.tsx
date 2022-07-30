import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';

// import { TimePickerModal } from 'react-native-paper-dates';
//import { useAddAlarm, useUpdateAlarm } from '../hooks/useAlarms';
import { useRingtones } from '../hooks/useRingtones';
import { Props } from './index';

interface FormSubmitValues {
  name: string;
  ringtone: string;
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
