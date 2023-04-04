import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import TabStackNavigator from './TabStackNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name={TabStackNavigator.name}
        component={TabStackNavigator.component}
      />
    </Tab.Navigator>
  );
};

export default {
  component: BottomTabNavigator,
  name: 'BottomTabNavigator' as const,
};
