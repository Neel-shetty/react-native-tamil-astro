import {Alert} from 'react-native';
import {api} from '.';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Auth from '@react-native-firebase/auth';

export async function VerifyOtp({otp, phone}: {otp: string; phone: string}) {
  return api
    .post('/login', {otp, phone})
    .then(async res => {
      console.log(res.data);
      if (res.data?.data) {
        AsyncStorage.setItem('id', JSON.stringify(res.data.data.id));
        const result = await Auth().signInWithCustomToken(res.data.token);
        console.log('🚀 ~ file: VerifyOtp.ts:14 ~ VerifyOtp ~ result:', result);
      }
      return true;
    })
    .catch(error => {
      console.log(error);
      if (error) {
        Alert.alert('Error', error.response.data.message);
      }
      return false;
    });
}
