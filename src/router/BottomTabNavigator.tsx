import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../screens/Main/HomeScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name={HomeScreen.name} component={HomeScreen.component} />
    </Tab.Navigator>
  );
};

export default {
  component: BottomTabNavigator,
  name: 'BottomTabNavigator' as const,
};
