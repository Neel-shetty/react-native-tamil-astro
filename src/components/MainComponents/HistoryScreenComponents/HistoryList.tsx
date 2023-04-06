import {StyleSheet, View} from 'react-native';
import React from 'react';
import HistoryCard from './HistoryCard';

const HistoryList = () => {
  const astrologer = {
    name: 'Kethan Swami',
    stars: 5,
    clients: 6234,
    experience: 10,
    language: 'English, Tamil',
    skills: 'Vedic, Numerology, Tarot',
    cost: 13,
  };
  return (
    <View style={styles.root}>
      <HistoryCard
        title={astrologer.name}
        experience={astrologer.experience}
        cost={astrologer.cost}
        clients={astrologer.clients}
        stars={astrologer.stars}
        skills={astrologer.skills}
        languages={astrologer.language}
      />
    </View>
  );
};

export default HistoryList;

const styles = StyleSheet.create({
  root: {},
});
