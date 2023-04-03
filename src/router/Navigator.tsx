import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Main/HomeScreen';
import {ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setLoggedIn} from '../store/UserSlice';
import SignInScreen from '../screens/Auth/SignInScreen';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  const [showSpashScreen, setShowSplashScreen] = useState(false);

  const dispatch = useDispatch();
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

  useEffect(() => {
    async function checkLoggedIn() {
      setShowSplashScreen(false);
      const result = await AsyncStorage.getItem('loggedIn');
      console.log(
        '🚀 ~ file: Navigator.tsx:22 ~ checkLoggedIn ~ result:',
        result,
      );
      if (result === 'true') {
        dispatch(setLoggedIn(true));
      }
    }
    checkLoggedIn();
  }, [dispatch]);

  if (showSpashScreen) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loggedIn ? (
          <Stack.Screen
            component={HomeScreen.component}
            name={HomeScreen.name}
          />
        ) : (
          <Stack.Screen
            component={SignInScreen.component}
            name={SignInScreen.name}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
