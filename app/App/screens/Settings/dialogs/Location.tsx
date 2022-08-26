import { countries as Countries } from 'country-code-lookup';
import React from 'react';
import { HelperText, TextInput } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

import Dialog from '~/components/Dialog';
import { useSettings, useUpdateSettings } from '~/hooks/useSettings';

import { DialogProps } from './index';

const countries = Countries.map((country) => ({
  label: country.country,
  value: country.iso2,
}));

export default function Location({ visible, setVisible }: DialogProps) {
  const { data: settingsData, status: settingsStatus } = useSettings();
  const updateSettings = useUpdateSettings();
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [city, setCity] = React.useState('');
  const [countryCode, setCountryCode] = React.useState('');
  const [error, setError] = React.useState({
    isError: false,
    message: '',
  });

  React.useEffect(() => {
    if (settingsStatus === 'success') {
      setCity(settingsData.location.city);
      setCountryCode(settingsData.location.countryCode);
    }
  }, [
    settingsData?.location.city,
    settingsData?.location.countryCode,
    settingsStatus,
  ]);

  if (settingsStatus !== 'success') {
    return null;
  }

  return (
    <Dialog
      hideDialog={() => setVisible(false)}
      visible={visible}
      title="Position"
      buttonText="Speichern"
      onDone={() => {
        const validated = validate(city);
        if (validated !== true) {
          setError({
            isError: true,
            message: validated,
          });
          return;
        }
        updateSettings.mutate({ location: { city, countryCode } });
        setError({
          isError: false,
          message: '',
        });
        setVisible(false);
      }}
      content={
        <>
          <TextInput
            value={city}
            label="Stadt"
            mode="outlined"
            onChangeText={(v) => setCity(v)}
            error={error.isError}
          />
          <HelperText type="error" visible={error.isError}>
            {error.message}
          </HelperText>
          <DropDown
            label="Ländercode"
            mode="outlined"
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={countryCode}
            setValue={setCountryCode}
            list={countries}
          />
        </>
      }
    />
  );
}

function validate(value: string) {
  if (value.length === 0) {
    return 'Ungültige Stadt';
  }
  return true;
}
