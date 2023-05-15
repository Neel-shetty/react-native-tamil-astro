import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import AstrologerCard from './AstrologerCard';
import {useQuery} from '@tanstack/react-query';
import {FetchAstrologerCategories} from '../../../api/FetchAstrologerCategories';

const AstrologerList = ({
  onPress,
  showGenderOptions,
  onPressCall,
}: {
  onPress?: () => void;
  showGenderOptions?: boolean;
  onPressCall: () => void;
}) => {
  const data = [
    {
      title: 'Junior Astrologer',
      stars: 4.2,
      cost: '8',
      firstTime: false,
      clients: '1000',
      experience: '1 to 3 Years',
    },
    {
      title: 'Senior Astrologer',
      stars: 4.8,
      cost: '12',
      firstTime: true,
      clients: '4000',
      experience: '3 to 8 Years',
    },
    {
      title: 'Expert Astrologer',
      stars: 5,
      cost: '20',
      firstTime: true,
      clients: '10,000',
      experience: '8+ Years',
    },
  ];

  const {data: AstrologerApiData, isLoading} = useQuery(
    ['astrologers'],
    FetchAstrologerCategories,
  );

  console.log(
    '🚀 ~ file: AstrologerList.tsx:42 ~ AstrologerApiData:',
    AstrologerApiData,
  );

  // if (isLoading || !AstrologerApiData) {
  //   return <View />;
  // }

  return (
    <View style={styles.root}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={AstrologerApiData}
        renderItem={({item}) => (
          <AstrologerCard
            clients={item.clients}
            cost={item.rate}
            experience={item.experience}
            firstTime={item.firstTime}
            stars={item.stars}
            title={item.name}
            onPress={onPress}
            showGenderOptions={showGenderOptions}
            loading={isLoading}
            onPressCall={onPressCall}
          />
        )}
      />
    </View>
  );
};

export default AstrologerList;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 10,
  },
});
