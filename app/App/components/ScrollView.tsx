import * as React from 'react';
import { ScrollView as OldScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function ScrollView({
  children,
}: {
  children: React.ReactNode;
}) {
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
  return <OldScrollView style={styles.scrollview}>{children}</OldScrollView>;
}
