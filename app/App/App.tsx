import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import SInfo from 'react-native-sensitive-info';

import Auth from './Auth';
import Section from './components/Section';
import Colors from './constants/Colors';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = React.useState(true);
  const [mustAuth, setMustAuth] = React.useState(true);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  React.useEffect(() => {
    (async function () {
      try {
        await SInfo.getItem('token', {});
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setMustAuth(true);
      }
    })();
  }, []);

  if (loading) {
    return <Text>Loading</Text>;
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {mustAuth ? <Section title="Colors">App</Section> : <Auth />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
