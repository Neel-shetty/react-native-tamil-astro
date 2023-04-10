import {Alert} from 'react-native';
import {api} from '.';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function VerifyOtp({otp, phone}: {otp: string; phone: string}) {
  return api
    .post('/login', {otp, phone})
    .then(res => {
      console.log(res.data);
      if (res.data?.data?.id) {
        AsyncStorage.setItem('id', JSON.stringify(res.data.data.id));
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
