import React from 'react';
import { useController, useForm } from 'react-hook-form';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import { Button, List } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import { LogicProps } from 'react-native-paper-form-builder/dist/Types/Types';

import ScrollView from '../components/ScrollView';
import { postRingtone } from '../utils/api';
import { Props } from './index';

interface FormSubmitValues {
  name: string;
  ringtone: DocumentPickerResponse;
}

export default function RingtoneForm(_: Props<'RingtoneForm'>) {
  const {
    control,
    setFocus,
    handleSubmit: formHandleSubmit,
  } = useForm<FormSubmitValues>({
    defaultValues: {
      name: '',
      ringtone: { name: '', uri: '' },
    },
    mode: 'onChange',
  });

  function handleSubmit({ name, ringtone }: FormSubmitValues) {
    postRingtone({ name, ringtone });
    console.log('Uploading', { name });
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
            type: 'custom',
            name: 'ringtone',
            JSX: CustomFilePicker,
            rules: {
              validate: (value: FormSubmitValues['ringtone']) =>
                /^.*\.mp3$/.test(value.name),
            },
          },
        ]}
      />
      <Button
        mode="contained"
        onPress={formHandleSubmit((onValid) => handleSubmit(onValid))}>
        Hinzufügen
      </Button>
    </ScrollView>
  );
}

function CustomFilePicker(props: LogicProps) {
  const { field } = useController(props);
  const handleClick = () => {
    DocumentPicker.pickSingle({ type: 'audio/mpeg' }).then((v) =>
      field.onChange(v),
    );
  };
  return (
    <List.Item
      title="Klingelton"
      right={() => (
        <Button onPress={handleClick}>
          {field.value.name.length === 0 ? 'Wählen' : field.value.name}
        </Button>
      )}
    />
  );
}
