import {Alert} from 'react-native';
import {api} from '.';

export async function FetchAstrologerCategories() {
  return api
    .post('/astro-category')
    .then(res => {
      // console.log(res.data);
      return res.data.data;
    })
    .catch(error => {
      console.log(error);
      if (error) {
        Alert.alert('Error', error.response.data.message);
      }
      return [];
    });
}
