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
import DrawerNavigator from './DrawerNavigator';
// import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  const [showSpashScreen, setShowSplashScreen] = useState(false);

  const dispatch = useDispatch();
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

  useEffect(() => {
    setShowSplashScreen(true);
    async function checkLoggedIn() {
      const result = await AsyncStorage.getItem('loggedIn');
      console.log(
        '🚀 ~ file: Navigator.tsx:22 ~ checkLoggedIn ~ result:',
        result,
      );
      if (result === 'true') {
        dispatch(setLoggedIn(true));
      }
      setShowSplashScreen(false);
    }
    checkLoggedIn();
  }, [dispatch]);

  if (showSpashScreen) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        {loggedIn ? (
          <>
            <Stack.Screen
              component={DrawerNavigator.component}
              name={DrawerNavigator.name}
            />
            {/* <Stack.Screen
              component={BottomTabNavigator.component}
              name={BottomTabNavigator.name}
            /> */}
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
