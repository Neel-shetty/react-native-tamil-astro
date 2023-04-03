import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name={BottomTabNavigator.name}
        component={BottomTabNavigator.component}
      />
    </Drawer.Navigator>
  );
};

export default {component: DrawerNavigator, name: 'DrawerNavigator' as const};
