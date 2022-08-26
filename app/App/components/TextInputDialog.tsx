import React from 'react';
import {
  Button,
  Dialog,
  HelperText,
  Portal,
  TextInput as PaperTextInput,
} from 'react-native-paper';

interface TextInputDialogProps {
  visible: boolean;
  hideDialog: () => void;
  title: string;
  value: string;
  onChangeText: (text: string) => void;
  buttonText: string;
  onDone: () => void;
  errorText: string;
  errorVisible: boolean;
}

export default function TextInputDialog({
  visible,
  hideDialog,
  title,
  value,
  onChangeText,
  buttonText,
  onDone,
  errorText,
  errorVisible,
}: TextInputDialogProps) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <PaperTextInput
            value={value}
            label={title}
            onChangeText={onChangeText}
            error={errorVisible}
          />
          <HelperText type="error" visible={errorVisible}>
            {errorText}
          </HelperText>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDone}>{buttonText}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
