import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '.';

type RechargeBalanceType = {status: number; balance: string};

export async function RechargeBalance({
  amount,
  transaction_id,
}: {
  amount: number;
  transaction_id: string;
}) {
  const id = await AsyncStorage.getItem('id');
  return api
    .post('/recharge/wallet', {user_id: id, amount, transaction_id})
    .then(res => {
      return res.data as RechargeBalanceType;
    })
    .catch(err => {
      return err;
    }) as Promise<RechargeBalanceType>;
}
