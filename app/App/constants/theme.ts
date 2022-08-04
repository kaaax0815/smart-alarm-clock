import { DarkTheme as DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  version: 3,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: '#017bff',
    accent: '#0891b2',
  },
} as typeof DefaultTheme;

export default theme;
