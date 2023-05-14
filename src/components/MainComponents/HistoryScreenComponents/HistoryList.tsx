import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import HistoryCard from './HistoryCard';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type HistoryList = {
  astrologerId: number;
  astrologerExperience: string;
  astrologerImage: string;
  astrologerRating: string;
  userId: string;
  astrologerName: string;
  astrologerPrice: number;
  astrologerSkills: string;
  chat: boolean;
  messages: {message: string; uid: string}[];
  time: any;
}[];

const HistoryList = () => {
  const [history, setHistory] = React.useState<HistoryList>([]);
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

  React.useEffect(() => {
    firestore()
      .collection('chats')
      .where('userId', '==', auth().currentUser?.uid)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => doc.data());
        console.log(
          '🚀 ~ file: HistoryList.tsx:26 ~ React.useEffect ~ data:',
          data,
        );
        setHistory(data);
      });
  }, []);

  return (
    <View style={styles.root}>
      <FlatList
        data={history}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return <HistoryCard astrologer={item} />;
        }}
      />
    </View>
  );
};

export default HistoryList;

const styles = StyleSheet.create({
  root: {},
});
