import {api} from '.';

export async function AstrologerFeedback({
  userId,
  astroId,
  rating,
  review,
  type,
}: {
  userId: number;
  astroId: number;
  rating: number;
  review: string;
  type: 'chat' | 'call';
}) {
  api
    .post('insert/feedback', {
      user_id: userId,
      astro_id: astroId,
      rating,
      review: review ?? '',
      type,
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err?.response?.data);
    });
}
