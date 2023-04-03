import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import OtpScreen from '../screens/Auth/OtpScreen';
import SignInScreen from '../screens/Auth/SignInScreen';
import HomeScreen from '../screens/Main/HomeScreen';

export type RootStackParamList = {
  [HomeScreen.name]: undefined;
  [OtpScreen.name]: {phone: string};
  [SignInScreen.name]: undefined;
  languageScreen: undefined;
};

export type HomeScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
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
