import { countries as Countries } from 'country-code-lookup';
import React from 'react';
import { HelperText, TextInput } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

import Dialog from '~/components/Dialog';
import { useSettings, useUpdateSettings } from '~/hooks/useSettings';

import dialogReducer, {
  DEFAULT_LOCATION_STATE,
  DialogActionType,
  LocationState,
} from './dialogReducer';
import { DialogProps } from './index';

const countries = Countries.map((country) => ({
  label: country.country,
  value: country.iso2,
}));

export default function Location({ visible, setVisible }: DialogProps) {
  const { data: settingsData, status: settingsStatus } = useSettings();
  const updateSettings = useUpdateSettings();
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [state, dispatch] = React.useReducer(
    dialogReducer<LocationState>,
    DEFAULT_LOCATION_STATE,
  );

  React.useEffect(() => {
    if (settingsStatus === 'success') {
      dispatch({
        type: DialogActionType.DATA,
        payload: settingsData.location,
      });
    }
  }, [settingsData?.location, settingsStatus]);

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
        const validated = validate(state.city);
        if (validated !== true) {
          dispatch({
            type: DialogActionType.ERROR,
            payload: {
              errorMessage: validated,
            },
          });
          return;
        }
        updateSettings.mutate({ location: state });
        setVisible(false);
      }}
      content={
        <>
          <TextInput
            value={state.city}
            label="Stadt"
            mode="outlined"
            onChangeText={(v) => {
              dispatch({
                type: DialogActionType.DATA,
                payload: {
                  city: v,
                },
              });
            }}
            error={state.isError}
          />
          <HelperText type="error" visible={state.isError}>
            {state.errorMessage}
          </HelperText>
          <DropDown
            label="Ländercode"
            mode="outlined"
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={state.countryCode}
            setValue={(v) => {
              dispatch({
                type: DialogActionType.DATA,
                payload: {
                  countryCode: v,
                },
              });
            }}
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
