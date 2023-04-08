import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import DrawerNavigator from './DrawerNavigator';
import HistoryTabDrawerNavigator from './HistoryTabDrawerNavigator';
import BottomTabBar from './UI/BottomTabBar';
import ConsultAstrologerScreen from './ConsultAstrologerScreen';

const Tab = createBottomTabNavigator();

const BottomTabBarFunc = (props: BottomTabBarProps) => {
  return <BottomTabBar {...props} />;
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={BottomTabBarFunc}
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        name={DrawerNavigator.name}
        options={{tabBarLabel: 'Home'}}
        component={DrawerNavigator.component}
      />
      <Tab.Screen
        name={ConsultAstrologerScreen.name}
        component={ConsultAstrologerScreen.component}
      />
      <Tab.Screen
        name={HistoryTabDrawerNavigator.name}
        component={HistoryTabDrawerNavigator.component}
        options={{tabBarLabel: 'History'}}
      />
    </Tab.Navigator>
  );
};

export default {
  component: BottomTabNavigator,
  name: 'BottomTabNavigator' as const,
};
