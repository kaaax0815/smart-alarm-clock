import { DarkTheme as DefaultNavigationTheme } from '@react-navigation/native';
import { DarkTheme as DefaultPaperTheme } from 'react-native-paper';

export const PaperTheme = {
  ...DefaultPaperTheme,
  version: 3,
  roundness: 8,
  colors: {
    ...DefaultPaperTheme.colors,
    primary: '#017bff',
    accent: '#0891b2',
  },
} as typeof DefaultPaperTheme;

export const NavigationTheme = {
  ...DefaultNavigationTheme,
  colors: {
    ...DefaultNavigationTheme.colors,
    ...PaperTheme.colors,
    card: PaperTheme.colors.primary,
  },
} as typeof DefaultNavigationTheme;
