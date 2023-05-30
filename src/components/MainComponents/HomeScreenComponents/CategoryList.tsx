import {StyleSheet, View, FlatList} from 'react-native';
import React from 'react';
import Love from '../../../../assets/icons/HomeScreen/love.svg';
import Career from '../../../../assets/icons/HomeScreen/job.svg';
import Money from '../../../../assets/icons/HomeScreen/money.svg';
import Family from '../../../../assets/icons/HomeScreen/family.svg';
import Health from '../../../../assets/icons/HomeScreen/health.svg';
import Other from '../../../../assets/icons/HomeScreen/other.svg';
import {layout} from '../../../constants/layout';
import CategoryButton from './CategoryButton';
import {useTranslation} from 'react-i18next';

const CategoryList = ({onPress}: {onPress: () => void}) => {
  const {t} = useTranslation();
  const categories = [
    {
      title: t('Love'),
      logo: <Love />,
    },
    {
      title: t('Career'),
      logo: <Career />,
    },
    {
      title: t('Money'),
      logo: <Money />,
    },
    {
      title: t('Family'),
      logo: <Family />,
    },
    {
      title: t('Health'),
      logo: <Health />,
    },
    {
      title: t('Other'),
      logo: <Other />,
    },
  ];
  return (
    <View style={styles.root}>
      <FlatList
        style={{width: layout.width}}
        data={categories}
        renderItem={({item, index}) => (
          <CategoryButton
            key={index}
            onPress={onPress}
            title={item.title}
            logo={item.logo}
          />
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
