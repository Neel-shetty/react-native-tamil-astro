import {Alert} from 'react-native';
import {api} from '.';

export async function VerifyOtp({otp}: {otp: string}) {
  return api
    .post('/otp', {otp})
    .then(res => {
      console.log(res.data);
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
