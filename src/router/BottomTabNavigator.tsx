import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import TabStackNavigator from './TabStackNavigator';
import HistoryScreen from '../screens/Main/HistoryScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name={TabStackNavigator.name}
        component={TabStackNavigator.component}
      />
      <Tab.Screen
        name={HistoryScreen.name}
        component={HistoryScreen.component}
      />
    </Tab.Navigator>
  );
};

export default {
  component: BottomTabNavigator,
  name: 'BottomTabNavigator' as const,
};
