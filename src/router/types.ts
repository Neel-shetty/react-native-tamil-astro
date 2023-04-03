import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import OtpScreen from '../screens/Auth/OtpScreen';
import SignInScreen from '../screens/Auth/SignInScreen';
import HomeScreen from '../screens/Main/HomeScreen';
import LanguageScreen from '../screens/Main/LanguageScreen';
import DrawerNavigator from './DrawerNavigator';
import {NavigatorScreenParams} from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';

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
  [HomeScreen.name]: undefined;
};

export type DrawerNavigatorNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  typeof DrawerNavigator.name
>;

export type HomeScreenNavigationProp = BottomTabScreenProps<
  BottomTabPraramList,
  typeof HomeScreen.name
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
