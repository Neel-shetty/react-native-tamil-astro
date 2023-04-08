import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TransactionHistoryScreen from '../screens/Main/TransactionHistoryScreen';
import RechargeScreen from '../screens/Main/RechargeScreen';
import TabStackNavigator from './TabStackNavigator';
import HeaderRightIcons from './UI/HeaderRightIcons';
import LanguageScreen from '../screens/Main/LanguageScreen';
import {StyleProp, ViewStyle} from 'react-native';
import {LeftIcons} from './LeftIcons';

const Drawer = createDrawerNavigator();

const RightIcons = (props: {
  tintColor?: string | undefined;
  pressColor?: string | undefined;
  pressOpacity?: number | undefined;
  labelVisible?: boolean | undefined;
}) => {
  return <HeaderRightIcons {...props} />;
};

export const leftIconStyle: StyleProp<ViewStyle> = {
  flexDirection: 'row',
  paddingLeft: 10,
  justifyContent: 'space-evenly',
  alignItems: 'center',
};

export const spacer: StyleProp<ViewStyle> = {
  width: 10,
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={({navigation}) => ({
        headerShadowVisible: true,
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: '#F31010',
        },
        headerRight: RightIcons,
        headerLeft: leftIconFun(navigation),
      })}>
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
function leftIconFun(
  navigation: any,
):
  | ((props: {
      tintColor?: string | undefined;
      pressColor?: string | undefined;
      pressOpacity?: number | undefined;
      labelVisible?: boolean | undefined;
    }) => React.ReactNode)
  | undefined {
  return () => {
    return <LeftIcons navigation={navigation} />;
  };
}
