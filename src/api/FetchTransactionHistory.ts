import {api} from '.';

type BalanceType = {status: number; balance: string};

export async function FetchTransactionHistory(id: string) {
  return api
    .post('/user-balance', {user_id: id})
    .then(res => {
      return res.data as BalanceType;
    })
    .catch(err => {
      return err;
    }) as Promise<BalanceType>;
}
