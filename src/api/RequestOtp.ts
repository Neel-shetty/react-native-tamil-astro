import {Alert} from 'react-native';
import {api} from '.';

export async function RequestOtp({phone}: {phone: string}) {
  return api
    .post('/otp', {phone})
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
