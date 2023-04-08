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
import ChatScreen from '../screens/Main/ChatScreen';
import HistoryTabDrawerNavigator from './HistoryTabDrawerNavigator';
import HistoryScreen from '../screens/Main/HistoryScreen';
import TransactionHistoryScreen from '../screens/Main/TransactionHistoryScreen';
import RechargeScreen from '../screens/Main/RechargeScreen';
import ConsultAstrologerScreen from './ConsultAstrologerScreen';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  [BottomTabNavigator.name]: NavigatorScreenParams<BottomTabPraramList>;
  [OtpScreen.name]: {phone: string};
  [SignInScreen.name]: undefined;
  [LanguageScreen.name]: undefined;
};

export type BottomTabPraramList = {
  [DrawerNavigator.name]: NavigatorScreenParams<DrawerParamList>;
  [HistoryTabDrawerNavigator.name]: NavigatorScreenParams<HistoryTabDrawerNavigatorParamList>;
  [ConsultAstrologerScreen.name]: undefined;
};

export type DrawerParamList = {
  [TabStackNavigator.name]: NavigatorScreenParams<TabStackParamList>;
  [TransactionHistoryScreen.name]: undefined;
  [RechargeScreen.name]: undefined;
  [LanguageScreen.name]: undefined;
};

export type HistoryTabDrawerNavigatorParamList = {
  [HistoryScreen.name]: undefined;
  [TransactionHistoryScreen.name]: undefined;
  [RechargeScreen.name]: undefined;
};

export type TabStackParamList = {
  [HomeScreen.name]: {
    astrologer?: string;
    showGenderOptions?: boolean;
  };
  [DetailsFormScreen.name]: undefined;
  [ChatScreen.name]: undefined;
};

export type DrawerNavigatorNavigationProp = BottomTabScreenProps<
  BottomTabPraramList,
  typeof DrawerNavigator.name
>;

export type HistoryTabDrawerNavigatorNavigationProp = BottomTabScreenProps<
  BottomTabPraramList,
  typeof HistoryTabDrawerNavigator.name
>;

export type HomeScreenNavigationProp = NativeStackScreenProps<
  TabStackParamList,
  typeof HomeScreen.name
>;

export type ChatScreenNavigationProp = NativeStackScreenProps<
  TabStackParamList,
  typeof ChatScreen.name
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
