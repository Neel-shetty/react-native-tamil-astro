import {Alert} from 'react-native';
import {api} from '.';

export interface AstrologerCategoryResponseType {
  status: number;
  data: AstrologerCategoryType[];
}

export interface AstrologerCategoryType {
  id: number;
  name: string;
  slug: string;
  rate: string;
  image: string;
  active: any;
  parent_id: any;
  created_at: string;
  updated_at: string;
}

export async function FetchAstrologerCategories() {
  return api
    .post('/astro-category')
    .then(res => {
      // console.log(res.data);
      return res.data.data as AstrologerCategoryType[];
    })
    .catch(error => {
      console.log(error);
      if (error) {
        Alert.alert('Error', error.response.data.message);
      }
      return [] as unknown as AstrologerCategoryType[];
    });
}
