import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setLoggedIn} from '../store/UserSlice';
import SignInScreen from '../screens/Auth/SignInScreen';
import {RootStackParamList} from './types';
import OtpScreen from '../screens/Auth/OtpScreen';
import LanguageScreen from '../screens/Main/LanguageScreen';
import BottomTabNavigator from './BottomTabNavigator';
import {useTranslation} from 'react-i18next';
// import BottomTabNavigator from './BottomTabNavigator';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import Auth from '@react-native-firebase/auth';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
  GROUP_VIDEO_CALL_CONFIG,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  GROUP_VOICE_CALL_CONFIG,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
  ZegoInvitationType,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  const [showSpashScreen, setShowSplashScreen] = useState(false);

  const dispatch = useDispatch();
  const {i18n} = useTranslation();
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

  useEffect(() => {
    setShowSplashScreen(true);
    async function checkLoggedIn() {
      const result = await AsyncStorage.getItem('loggedIn');
      console.log(
        '🚀 ~ file: Navigator.tsx:22 ~ checkLoggedIn ~ result:',
        result,
      );
      const language = await AsyncStorage.getItem('language');
      if (language) {
        if (language !== i18n.language) {
          i18n.changeLanguage(language).catch(err => console.log(err));
        }
      }
      if (result === 'true') {
        dispatch(setLoggedIn(true));
      }
      setShowSplashScreen(false);
    }
    checkLoggedIn();
  }, [dispatch, i18n]);

  useEffect(() => {
    async function initZegoCloudService() {
      const name = await AsyncStorage.getItem('name');
      ZegoUIKitPrebuiltCallService.init(
        572938071, // You can get it from ZEGOCLOUD's console
        'f6baf179282f742eeed83d3b8cc25e42be61696205162015126658a89d29c309', // You can get it from ZEGOCLOUD's console
        Auth().currentUser?.uid, // It can be any valid characters, but we recommend using a phone number.
        'User_' + Auth().currentUser?.uid,
        [ZIM, ZPNs],
        {
          ringtoneConfig: {
            incomingCallFileName: 'zego_incoming.mp3',
            outgoingCallFileName: 'zego_outgoing.mp3',
          },
          requireConfig: data => {
            const callConfig =
              data.invitees.length > 1
                ? ZegoInvitationType.videoCall === data.type
                  ? GROUP_VIDEO_CALL_CONFIG
                  : GROUP_VOICE_CALL_CONFIG
                : ZegoInvitationType.videoCall === data.type
                ? ONE_ON_ONE_VIDEO_CALL_CONFIG
                : ONE_ON_ONE_VOICE_CALL_CONFIG;
            return {
              ...callConfig,
              //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
              turnOnCameraWhenJoining: false,
              turnOnMicrophoneWhenJoining: false,
              useSpeakerWhenJoining: true,
              ///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
            };
          },
          notifyWhenAppRunningInBackgroundOrQuit: true,
          isIOSSandboxEnvironment: true,
          androidNotificationConfig: {
            channelID: 'ZegoUIKit',
            channelName: 'ZegoUIKit',
          },
        },
      );
    }
    if (!loggedIn) {
      return;
    }
    initZegoCloudService();
  }, [loggedIn]);

  if (showSpashScreen) {
    return null;
  }

  return (
    <NavigationContainer>
      <ZegoCallInvitationDialog />
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        {loggedIn ? (
          <>
            <Stack.Screen
              component={BottomTabNavigator.component}
              name={BottomTabNavigator.name}
            />
            <Stack.Screen
              options={{headerShown: false}}
              // DO NOT change the name
              name="ZegoUIKitPrebuiltCallWaitingScreen"
              component={ZegoUIKitPrebuiltCallWaitingScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              // DO NOT change the name
              name="ZegoUIKitPrebuiltCallInCallScreen"
              component={ZegoUIKitPrebuiltCallInCallScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              component={SignInScreen.component}
              name={SignInScreen.name}
            />
            <Stack.Screen
              component={OtpScreen.component}
              name={OtpScreen.name}
            />
            <Stack.Screen
              component={LanguageScreen.component}
              name={LanguageScreen.name}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
