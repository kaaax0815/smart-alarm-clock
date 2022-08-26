import React from 'react';
import DropDown from 'react-native-paper-dropdown';
import timeZones from 'timezones-list';

import Dialog from '~/components/Dialog';
import { useSettings, useUpdateSettings } from '~/hooks/useSettings';

import { DialogProps } from './index';

const timezones = timeZones.map((tz) => ({
  label: tz.label,
  value: tz.tzCode,
}));

export default function Timezone({ visible, setVisible }: DialogProps) {
  const { data: settingsData, status: settingsStatus } = useSettings();
  const updateSettings = useUpdateSettings();
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [timezone, setTimezone] = React.useState('');

  React.useEffect(() => {
    if (settingsStatus === 'success') {
      setTimezone(settingsData.timezone);
    }
  }, [settingsData?.timezone, settingsStatus]);

  if (settingsStatus !== 'success') {
    return null;
  }

  return (
    <Dialog
      hideDialog={() => setVisible(false)}
      visible={visible}
      title="Zeitzone"
      buttonText="Speichern"
      onDone={() => {
        updateSettings.mutate({ timezone });
        setVisible(false);
      }}
      content={
        <DropDown
          label="Zeitzone"
          mode="outlined"
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={timezone}
          setValue={setTimezone}
          list={timezones}
        />
      }
    />
  );
}
