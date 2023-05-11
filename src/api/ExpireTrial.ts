import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '.';

export async function ExpireTrial() {
  const user_id = AsyncStorage.getItem('id');
  api.post('/expire-free-trial', {user_id});
}
