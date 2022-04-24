import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Box, Center, HStack, Icon, Pressable, Text } from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Footer({ navigation, state }: BottomTabBarProps) {
  const selected = state.index;
  function onPress(index: number) {
    return () => {
      const isFocused = selected === index;
      const route = state.routes[index];
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        // The `merge: true` option makes sure that the params inside the tab screen are preserved
        navigation.navigate({ name: route.name, merge: true, params: {} });
      }
    };
  }
  function onLongPress(index: number) {
    return () => {
      const route = state.routes[index];
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    };
  }
  return (
    <Box>
      <Center flex={1} />
      <HStack
        bg="indigo.600"
        alignItems="center"
        safeAreaBottom
        shadow={6}
        height={50}>
        <Pressable
          opacity={selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={onPress(0)}
          onLongPress={onLongPress(0)}>
          <Center>
            <Icon
              mb="1"
              as={MaterialCommunityIcons}
              name="alarm"
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Wecker
            </Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={onPress(1)}
          onLongPress={onLongPress(1)}>
          <Center>
            <Icon
              mb="1"
              as={MaterialCommunityIcons}
              name={selected === 1 ? 'bell' : 'bell-outline'}
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Klingeltöne
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
}
