import React from 'react';
import { HelperText, TextInput } from 'react-native-paper';

import Dialog from '~/components/Dialog';
import { IP_PATTERN } from '~/constants/patterns';
import { SettingsContext } from '~/contexts/Settings';

import { DialogProps } from './index';

export default function IPAddress({ visible, setVisible }: DialogProps) {
  const settingsContext = React.useContext(SettingsContext);
  const [ipAddress, setIpAddress] = React.useState(settingsContext.ip!);
  const [errorText, setErrorText] = React.useState('');
  const [isError, setIsError] = React.useState(false);

  return (
    <Dialog
      hideDialog={() => setVisible(false)}
      visible={visible}
      title="IP-Adresse"
      buttonText="Speichern"
      onDone={() => {
        const validated = validate(ipAddress);
        if (validated !== true) {
          setErrorText(validated);
          setIsError(true);
          return;
        }
        settingsContext.setIP(ipAddress);
        setIsError(false);
        setVisible(false);
      }}
      content={
        <>
          <TextInput
            value={ipAddress}
            mode="outlined"
            label="IP-Adresse"
            onChangeText={(v) => setIpAddress(v)}
            error={isError}
          />
          <HelperText type="error" visible={isError}>
            {errorText}
          </HelperText>
        </>
      }
    />
  );
}

function validate(value: string) {
  if (!IP_PATTERN.test(value)) {
    return 'Ungültige IP-Adresse';
  }
  return true;
}
