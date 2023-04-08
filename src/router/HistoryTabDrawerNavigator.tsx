import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TransactionHistoryScreen from '../screens/Main/TransactionHistoryScreen';
import RechargeScreen from '../screens/Main/RechargeScreen';
import HistoryScreen from '../screens/Main/HistoryScreen';

const Drawer = createDrawerNavigator();

const HistoryTabDrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        component={HistoryScreen.component}
        name={HistoryScreen.name}
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

export default {
  component: HistoryTabDrawerNavigator,
  name: 'HistoryTabDrawerNavigator' as const,
};
