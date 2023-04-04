import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AstrologerCard from './AstrologerCard';

const AstrologerList = () => {
  const data = [
    {
      title: 'Junior Astrologer',
      stars: 5,
      cost: '8',
      firstTime: false,
      clients: '1000',
      experience: '1 to 3 Years',
    },
    {
      title: 'Senior Astrologer',
      stars: 5,
      cost: '8',
      firstTime: true,
      clients: '1000',
      experience: '1 to 3 Years',
    },
  ];
  return (
    <View style={styles.root}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({item}) => (
          <AstrologerCard
            clients={item.clients}
            cost={item.cost}
            experience={item.experience}
            firstTime={item.firstTime}
            stars={item.stars}
            title={item.title}
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
