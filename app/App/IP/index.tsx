import * as React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { Button, Text } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';

import ScrollView from '../components/ScrollView';

interface IPProps {
  setIP: (value: string) => void;
}

interface FormSubmitValues {
  ip: string;
}

export default function IP({ setIP }: IPProps) {
  const {
    control,
    setFocus,
    handleSubmit: formHandleSubmit,
  } = useForm<FormSubmitValues>({
    defaultValues: {
      ip: '',
    },
    mode: 'onChange',
  });

  React.useEffect(() => {
    RNBootSplash.hide();
  }, []);

  function handleSubmit(values: FormSubmitValues) {
    setIP(values.ip);
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Smarter Wecker</Text>
      <Text style={[styles.text, styles.top, styles.bottom]}>
        IP-Adresse des Smarten Weckers eingeben
      </Text>
      <FormBuilder
        control={control}
        setFocus={setFocus}
        formConfigArray={[
          {
            type: 'text',
            name: 'ip',

            rules: {
              required: {
                value: true,
                message: 'IP-Adresse ist erforderlich',
              },
              pattern: {
                value: /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/,
                message: 'IP-Adresse ist ungültig',
              },
            },
            textInputProps: {
              label: 'IP-Adresse',
            },
          },
        ]}
      />
      <Button
        mode="contained"
        onPress={formHandleSubmit((onValid) => handleSubmit(onValid))}>
        Speichern
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    textAlign: 'center',
    fontSize: 30,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
  },
  top: {
    marginTop: 5,
  },
  bottom: {
    marginBottom: 5,
  },
});
