import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsFormScreen from '../screens/Main/DetailsFormScreen';
import HomeScreen from '../screens/Main/HomeScreen';
import ChatScreen from '../screens/Main/ChatScreen';
import CallScreen from '../screens/Main/CallScreen';
import NewCall from '../components/CallComponents/NewCall';

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
      <Stack.Screen name={ChatScreen.name} component={ChatScreen.component} />
      <Stack.Screen name={NewCall.name} component={NewCall.component} />
      <Stack.Screen name={CallScreen.name} component={CallScreen.component} />
    </Stack.Navigator>
  );
};

export default {
  component: TabStackNavigator,
  name: 'TabStackNavigator' as const,
};
