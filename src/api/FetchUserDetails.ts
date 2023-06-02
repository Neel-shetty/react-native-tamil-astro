import {api} from '.';
import auth from '@react-native-firebase/auth';

export interface Root {
  status: number;
  data: Data;
}

export interface Data {
  id: number;
  assign_backup: any;
  free_chat: string;
  name: string;
  role: string;
  phone: string;
  image: any;
  gender: string;
  experience: any;
  clients: any;
  rating: any;
  category_id: any;
  sub_category_id: any;
  speak_tamil: any;
  speak_hindi: any;
  speak_english: any;
  skills: any;
  about: any;
  otp: string;
  is_recommended: any;
  email: any;
  is_online: any;
  is_active: any;
  place_of_birth: string;
  time_of_birth: string;
  date_of_birth: string;
  marital_status: string;
  type_of_problem: string;
  wallet: string;
  email_verified_at: any;
  created_at: string;
  updated_at: string;
}

export async function FetchUserDetails() {
  const user_id = auth().currentUser?.uid;
  // const response = await
  return api
    .post('/user/detail', {user_id})
    .then(res => {
      console.log(res.data);
      if (res.data?.status === 1) {
        // Alert.alert('Success', res.data?.message);
        return res.data?.data as Data;
      }
      return null;
    })
    .catch(error => {
      if (error) {
        console.log(error?.response?.data);
      }
      const tempData: Data = {
        id: 17,
        assign_backup: null,
        free_chat: '1',
        name: 'test name',
        role: '3',
        phone: '9380385003',
        image: null,
        gender: 'male',
        experience: null,
        clients: null,
        rating: null,
        category_id: null,
        sub_category_id: null,
        speak_tamil: null,
        speak_hindi: null,
        speak_english: null,
        skills: null,
        about: null,
        otp: '1234',
        is_recommended: null,
        email: null,
        is_online: null,
        is_active: null,
        place_of_birth: 'mumbai',
        time_of_birth: '2023-05-29T13:42:41.088Z',
        marital_status: 'married',
        type_of_problem: 'love',
        wallet: '50',
        email_verified_at: null,
        created_at: '2023-05-16T13:59:08.000000Z',
        updated_at: '2023-05-29T13:43:08.000000Z',
        date_of_birth: '2023-05-29T13:42:41.088Z',
      };
      return tempData;
    });
  // return response;
}
