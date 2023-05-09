import {api} from '.';

type RechargeBalanceType = {status: number; balance: string};

export async function RechargeBalance({
  id,
  amount,
  transaction_id,
}: {
  id: string;
  amount: string;
  transaction_id: string;
}) {
  return api
    .post('/recharge/wallet', {user_id: id, amount, transaction_id})
    .then(res => {
      return res.data as RechargeBalanceType;
    })
    .catch(err => {
      return err;
    }) as Promise<RechargeBalanceType>;
}
