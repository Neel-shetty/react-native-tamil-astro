import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsFormScreen from '../screens/Main/DetailsFormScreen';
import HomeScreen from '../screens/Main/HomeScreen';

const Stack = createNativeStackNavigator();

const TabStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name={HomeScreen.name} component={HomeScreen.component} />
      <Stack.Screen
        name={DetailsFormScreen.name}
        component={DetailsFormScreen.component}
      />
    </Stack.Navigator>
  );
};

export default {
  component: TabStackNavigator,
  name: 'TabStackNavigator' as const,
};
