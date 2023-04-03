import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import Love from '../../../../assets/icons/HomeScreen/love.svg';
import Career from '../../../../assets/icons/HomeScreen/job.svg';
import Money from '../../../../assets/icons/HomeScreen/money.svg';
import Family from '../../../../assets/icons/HomeScreen/family.svg';
import Health from '../../../../assets/icons/HomeScreen/health.svg';
import Other from '../../../../assets/icons/HomeScreen/other.svg';
import {layout} from '../../../constants/layout';
import CategoryButton from './CategoryButton';

const CategoryList = () => {
  const categories = [
    {
      title: 'Love',
      logo: <Love />,
    },
    {
      title: 'Career',
      logo: <Career />,
    },
    {
      title: 'Money',
      logo: <Money />,
    },
    {
      title: 'Family',
      logo: <Family />,
    },
    {
      title: 'Health',
      logo: <Health />,
    },
    {
      title: 'Other',
      logo: <Other />,
    },
  ];
  return (
    <View style={styles.root}>
      <FlatList
        style={{width: layout.width}}
        data={categories}
        renderItem={({item}) => (
          <CategoryButton title={item.title} logo={item.logo} />
        )}
        numColumns={3}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  root: {
    width: layout.width,
    marginVertical: 10,
  },
});
