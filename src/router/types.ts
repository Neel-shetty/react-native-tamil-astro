import type {NativeStackScreenProps} from '@react-navigation/native-stack';
// import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import OtpScreen from '../screens/Auth/OtpScreen';
import SignInScreen from '../screens/Auth/SignInScreen';
import HomeScreen from '../screens/Main/HomeScreen';
import LanguageScreen from '../screens/Main/LanguageScreen';
import DrawerNavigator from './DrawerNavigator';
import {NavigatorScreenParams} from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';
import DetailsFormScreen from '../screens/Main/DetailsFormScreen';
import TabStackNavigator from './TabStackNavigator';

export type RootStackParamList = {
  [DrawerNavigator.name]: NavigatorScreenParams<DrawerParamList>;
  [OtpScreen.name]: {phone: string};
  [SignInScreen.name]: undefined;
  [LanguageScreen.name]: undefined;
};

export type DrawerParamList = {
  [BottomTabNavigator.name]: NavigatorScreenParams<BottomTabPraramList>;
};

export type BottomTabPraramList = {
  [TabStackNavigator.name]: NavigatorScreenParams<TabStackParamList>;
};

export type TabStackParamList = {
  [HomeScreen.name]: {astrologer: string | undefined};
  [DetailsFormScreen.name]: undefined;
};

export type DrawerNavigatorNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  typeof DrawerNavigator.name
>;

export type HomeScreenNavigationProp = NativeStackScreenProps<
  TabStackParamList,
  typeof HomeScreen.name
>;

export type DetailsFormScreenNavigationProp = NativeStackScreenProps<
  TabStackParamList,
  typeof DetailsFormScreen.name
>;

export type SignInScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  typeof SignInScreen.name
>;

export type OtpScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  typeof OtpScreen.name
>;

export type LanguageScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  typeof LanguageScreen.name
>;
