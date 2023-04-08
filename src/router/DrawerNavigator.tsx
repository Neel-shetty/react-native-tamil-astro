import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TransactionHistoryScreen from '../screens/Main/TransactionHistoryScreen';
import RechargeScreen from '../screens/Main/RechargeScreen';
import TabStackNavigator from './TabStackNavigator';
import HeaderRightIcons from './UI/HeaderRightIcons';
import LanguageScreen from '../screens/Main/LanguageScreen';

const Drawer = createDrawerNavigator();

const RightIcons = (props: {
  tintColor?: string | undefined;
  pressColor?: string | undefined;
  pressOpacity?: number | undefined;
}) => {
  return <HeaderRightIcons {...props} />;
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShadowVisible: true,
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: '#F31010',
        },
        headerRight: RightIcons,
      }}>
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
      <Drawer.Screen
        component={LanguageScreen.component}
        name={LanguageScreen.name}
      />
    </Drawer.Navigator>
  );
};

export default {component: DrawerNavigator, name: 'DrawerNavigator' as const};
