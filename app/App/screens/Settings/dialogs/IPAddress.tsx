import React from 'react';
import { HelperText, TextInput } from 'react-native-paper';

import Dialog from '~/components/Dialog';
import { IP_PATTERN } from '~/constants/patterns';
import { SettingsContext } from '~/contexts/Settings';

import dialogReducer, {
  DEFAULT_IP_STATE,
  DialogActionType,
  IPState,
} from './dialogReducer';
import { DialogProps } from './index';

export default function IPAddress({ visible, setVisible }: DialogProps) {
  const settingsContext = React.useContext(SettingsContext);
  const [state, dispatch] = React.useReducer(dialogReducer<IPState>, {
    ...DEFAULT_IP_STATE,
    ip: settingsContext.ip!,
  });

  return (
    <Dialog
      hideDialog={() => setVisible(false)}
      visible={visible}
      title="IP-Adresse"
      buttonText="Speichern"
      onDone={() => {
        const validated = validate(state.ip);
        if (validated !== true) {
          dispatch({
            type: DialogActionType.ERROR,
            payload: {
              errorMessage: validated,
            },
          });
          return;
        }
        settingsContext.setIP(state.ip);
        setVisible(false);
      }}
      content={
        <>
          <TextInput
            value={state.ip}
            mode="outlined"
            label="IP-Adresse"
            onChangeText={(v) =>
              dispatch({
                type: DialogActionType.DATA,
                payload: {
                  ip: v,
                },
              })
            }
            error={state.isError}
          />
          <HelperText type="error" visible={state.isError}>
            {state.errorMessage}
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
