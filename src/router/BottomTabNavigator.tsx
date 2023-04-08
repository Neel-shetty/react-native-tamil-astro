import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import DrawerNavigator from './DrawerNavigator';
import HistoryTabDrawerNavigator from './HistoryTabDrawerNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      {/* <Tab.Screen
        name={TabStackNavigator.name}
        component={TabStackNavigator.component}
      /> */}
      <Tab.Screen
        name={DrawerNavigator.name}
        component={DrawerNavigator.component}
      />
      <Tab.Screen
        name={HistoryTabDrawerNavigator.name}
        component={HistoryTabDrawerNavigator.component}
      />
    </Tab.Navigator>
  );
};

export default {
  component: BottomTabNavigator,
  name: 'BottomTabNavigator' as const,
};
