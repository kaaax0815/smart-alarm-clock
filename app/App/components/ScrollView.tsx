import React from 'react';
import {
  ScrollView as OldScrollView,
  ScrollViewProps,
  StyleSheet,
} from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

export default function ScrollView({
  children,
  style,
  isLoading,
  ...rest
}: ScrollViewProps & { isLoading?: boolean }) {
  const { colors } = useTheme();
  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        scrollview: {
          backgroundColor: colors.background,
          flex: 1,
          padding: 10,
        },
      }),
    [colors],
  );

  return (
    <OldScrollView style={[styles.scrollview, style]} {...rest}>
      {isLoading ? <ActivityIndicator size="large" animating /> : children}
    </OldScrollView>
  );
}
