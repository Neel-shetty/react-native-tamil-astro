import React from 'react';
import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import TransactionHistoryScreen from '../screens/Main/TransactionHistoryScreen';
import RechargeScreen from '../screens/Main/RechargeScreen';
import HistoryScreen from '../screens/Main/HistoryScreen';
import {StyleProp, Text, TextStyle, ViewStyle} from 'react-native';
import {LeftIcons} from './LeftIcons';
import {colors} from '../themes/colors';
import CustomDrawer from './UI/CustomDrawer';
import {fonts} from '../themes/fonts';
import HeaderRightIcons from './UI/HeaderRightIcons';
import LanguageScreen from '../screens/Main/LanguageScreen';

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

const headerTitleStyle1: StyleProp<TextStyle> = {
  fontFamily: fonts.contageRegular,
  fontSize: 18,
  color: colors.palette.accent500,
};

const headerTitleStyle2: StyleProp<TextStyle> = {
  fontFamily: fonts.contageRegular,
  fontSize: 18,
  color: '#F8B111',
  position: 'absolute',
  left: -1.5,
};

const HeaderTitle = () => {
  return (
    <>
      <Text style={headerTitleStyle2}>Tamil Astro</Text>
      <Text style={headerTitleStyle1}>Tamil Astro</Text>
    </>
  );
};

const HistoryTabDrawerNavigator = () => {
  const drawer = (props: DrawerContentComponentProps) => (
    <CustomDrawer {...props} />
  );
  return (
    <Drawer.Navigator
      drawerContent={drawer}
      screenOptions={({navigation}) => ({
        headerShadowVisible: true,
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: '#F31010',
        },
        headerRight: RightIcons,
        headerLeft: leftIconFun(navigation),
        drawerItemStyle: {
          backgroundColor: colors.palette.white,
          padding: 0,
          margin: 0,
        },
        drawerContentContainerStyle: {
          paddingVertical: 0,
          margin: 0,
        },
        headerTitleStyle: {
          fontFamily: fonts.contageRegular,
          fontSize: 18,
        },
        headerTitle: HeaderTitle,
      })}>
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
      <Drawer.Screen
        component={LanguageScreen.component}
        name={LanguageScreen.name}
      />
    </Drawer.Navigator>
  );
};

export default {
  component: HistoryTabDrawerNavigator,
  name: 'HistoryTabDrawerNavigator' as const,
};

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
