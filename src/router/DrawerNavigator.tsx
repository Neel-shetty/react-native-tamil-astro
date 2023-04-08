import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TransactionHistoryScreen from '../screens/Main/TransactionHistoryScreen';
import RechargeScreen from '../screens/Main/RechargeScreen';
import TabStackNavigator from './TabStackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      {/* <Drawer.Screen
        name={BottomTabNavigator.name}
        component={BottomTabNavigator.component}
      /> */}
      <Drawer.Screen
        name={TabStackNavigator.name}
        component={TabStackNavigator.component}
      />
      <Drawer.Screen
        name={TransactionHistoryScreen.name}
        component={TransactionHistoryScreen.component}
      />
      <Drawer.Screen
        component={RechargeScreen.component}
        name={RechargeScreen.name}
      />
    </Drawer.Navigator>
  );
};

export default {component: DrawerNavigator, name: 'DrawerNavigator' as const};
