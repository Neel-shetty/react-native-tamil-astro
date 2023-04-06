import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import HistoryCard from './HistoryCard';

const HistoryList = () => {
  const [history, _] = React.useState([1, 2, 3, 4, 5]);
  const astrologer = {
    name: 'Kethan Swami',
    stars: 5,
    clients: '6234',
    experience: '10',
    language: 'English, Tamil',
    skills: 'Vedic, Numerology, Tarot',
    cost: '13',
    chat: true,
  };
  return (
    <View style={styles.root}>
      <FlatList
        data={history}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return <HistoryCard astrologer={astrologer} />;
        }}
      />
    </View>
  );
};

export default HistoryList;

const styles = StyleSheet.create({
  root: {},
});
