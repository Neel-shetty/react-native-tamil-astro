import {api} from '.';

export interface PlanType {
  id: number;
  amount: string;
  bonus?: string;
  tag?: string;
  created_at: string;
  updated_at: string;
}

export async function FetchRecharge() {
  return api
    .post('/plans')
    .then(res => {
      return res.data.data;
    })
    .catch(err => {
      return err;
    }) as Promise<PlanType[]>;
}
