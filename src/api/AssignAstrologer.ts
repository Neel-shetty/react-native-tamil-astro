import {useSelector} from 'react-redux';
import {api} from '.';
import {RootState} from '../store';

export interface AssignedAstrologerType {
  price: number;
  id: number;
  assign_backup: any;
  name: string;
  role: string;
  phone: string;
  image: string;
  gender: any;
  experience: string;
  clients: string;
  rating: string;
  category_id: string;
  sub_category_id: any;
  speak_tamil: string;
  speak_hindi: any;
  speak_english: string;
  skills: string;
  about: string;
  otp: any;
  is_recommended: any;
  email: any;
  is_online: any;
  is_active: any;
  place_of_birth: any;
  time_of_birth: any;
  marital_status: any;
  type_of_problem: any;
  wallet: string;
  email_verified_at: any;
  created_at: string;
  updated_at: string;
}

export async function AssignAstrologer({
  astrologerGender,
  astrologerCategoryId,
}: {
  astrologerGender: 'Male' | 'Female' | 'Other';
  astrologerCategoryId: number;
}) {
  return api
    .post('find-astro', {
      gender: astrologerGender,
      category_id: astrologerCategoryId,
    })
    .then(res => {
      // console.log(res.data);
      return res.data?.data as AssignedAstrologerType;
    })
    .catch(err => {
      console.error(err?.response?.data);
      return err;
    }) as Promise<AssignedAstrologerType>;
}
