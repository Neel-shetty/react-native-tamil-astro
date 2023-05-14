import {Alert} from 'react-native';
import {api} from '.';
import auth from '@react-native-firebase/auth';

interface SubmitDetailsProps {
  name: string;
  gender: string;
  placeOfBirth: string;
  maritialStatus?: string;
  typeOfProblem?: string;
  date: Date | undefined;
}

export async function SubmitDetails({
  name,
  gender,
  placeOfBirth,
  maritialStatus,
  typeOfProblem,
  date,
}: SubmitDetailsProps) {
  const user_id = auth().currentUser?.uid;
  const formdata = new FormData();
  formdata.append('user_id', user_id);
  formdata.append('name', name);
  formdata.append('gender', gender);
  formdata.append('place_of_birth', placeOfBirth);
  if (date) {
    formdata.append('time_of_birth', date.toISOString());
  }
  if (maritialStatus) {
    formdata.append('marital_status', maritialStatus);
  }
  if (typeOfProblem) {
    formdata.append('type_of_problem', typeOfProblem);
  }
  api
    .post('astro-detail-update', formdata, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => {
      console.log(res.data);
      if (res.data?.status) {
        Alert.alert('Success', res.data?.message);
      }
    })
    .catch(error => {
      console.log(error);
      if (error) {
        Alert.alert('Error', error?.response?.data?.message);
      }
    });
}
