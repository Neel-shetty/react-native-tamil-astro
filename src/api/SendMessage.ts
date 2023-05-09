import {api} from '.';

type SendMessageType = {status: number; balance: string};

export async function SendMessage({
  to,
  from,
  uniqueId,
  message,
}: {
  to: string;
  from?: string;
  uniqueId: number;
  message: string;
}) {
  return api
    .post('/chat-insert', {
      to_user: to,
      from_user: from,
      unique_id: uniqueId,
      message,
    })
    .then(res => {
      return res.data as SendMessageType;
    })
    .catch(err => {
      return err;
    }) as Promise<SendMessageType>;
}
