import {Alert} from 'react-native';
import {api} from '.';

interface SubmitDetailsProps {
  name: string;
  gender: string;
  placeOfBirth: string;
  maritialStatus?: string;
  typeOfProblem?: string;
}

export async function SubmitDetails({
  name,
  gender,
  placeOfBirth,
  maritialStatus,
  typeOfProblem,
}: SubmitDetailsProps) {
  const formdata = new FormData();
  formdata.append('name', name);
  formdata.append('gender', gender);
  formdata.append('placeOfBirth', placeOfBirth);
  if (maritialStatus) {
    formdata.append('maritialStatus', maritialStatus);
  }
  if (typeOfProblem) {
    formdata.append('typeOfProblem', typeOfProblem);
  }
  api
    .post('', formdata)
    .then(res => {
      console.log(res.data);
      if (res.data?.status) {
        Alert.alert('Success', res.data.message);
      }
    })
    .catch(error => {
      console.log(error);
      if (error) {
        Alert.alert('Error', error.response.data.message);
      }
    });
}
