import {api} from '.';

export interface Root {
  status: number;
  data: TransactionHistoryType[];
}

export interface TransactionHistoryType {
  id: number;
  unique_id: any;
  user_id: string;
  title: string;
  amount: string;
  type: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export async function FetchTransactionHistory(id: string) {
  console.log('fetcing transactions');
  return api
    .post('/transaction-history', {user_id: id})
    .then(res => {
      return res.data.data as TransactionHistoryType[];
    })
    .catch(err => {
      return err;
    }) as Promise<TransactionHistoryType[]>;
}
