import React from 'react';
import { Button, Dialog as PaperDialog, Portal } from 'react-native-paper';

interface DialogProps {
  visible: boolean;
  hideDialog: () => void;
  title: string;
  buttonText: string;
  onDone: () => void;
  content: React.ReactNode;
}

export default function Dialog({
  visible,
  hideDialog,
  title,
  buttonText,
  onDone,
  content,
}: DialogProps) {
  return (
    <Portal>
      <PaperDialog visible={visible} onDismiss={hideDialog}>
        <PaperDialog.Title>{title}</PaperDialog.Title>
        <PaperDialog.Content>{content}</PaperDialog.Content>
        <PaperDialog.Actions>
          <Button onPress={onDone}>{buttonText}</Button>
        </PaperDialog.Actions>
      </PaperDialog>
    </Portal>
  );
}
