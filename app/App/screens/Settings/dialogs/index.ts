export { default as IPAddressDialog } from './IPAddress';
export { default as TimezoneDialog } from './Timezone';
export { default as LocationDialog } from './Location';

export interface DialogProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}
