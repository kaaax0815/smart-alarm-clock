import React from 'react';

import TextInputDialog from '~/components/TextInputDialog';
import { IP_PATTERN } from '~/constants/patterns';
import { SettingsContext } from '~/contexts/Settings';

interface IPAddressProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export default function IPAddress({ visible, setVisible }: IPAddressProps) {
  const settingsContext = React.useContext(SettingsContext);
  const [ipAddress, setIpAddress] = React.useState(settingsContext.ip!);
  const [errorText, setErrorText] = React.useState('');
  const [isError, setIsError] = React.useState(false);

  return (
    <TextInputDialog
      value={ipAddress}
      hideDialog={() => setVisible(false)}
      onChangeText={(v) => setIpAddress(v)}
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
      errorText={errorText}
      errorVisible={isError}
    />
  );
}

function validate(value: string) {
  if (!IP_PATTERN.test(value)) {
    return 'Ungültige IP-Adresse';
  }
  return true;
}
