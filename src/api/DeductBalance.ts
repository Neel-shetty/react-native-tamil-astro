import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '.';
import auth from '@react-native-firebase/auth';

export async function DeductBalance({
  amount,
  astrologerName,
  uniqueId,
  id
}: {
  amount: number;
  astrologerName: string;
  uniqueId: number;
  id: string;
}) {
  api
    .post('user-chat-amount-deduct', {
      user_id: id,
      astro_name: astrologerName,
      unique_id: uniqueId,
      amount: amount,
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err?.response?.data);
    });
}
