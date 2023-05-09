import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import Transaction from './Transaction';
import {layout} from '../../../constants/layout';
import {useQuery} from '@tanstack/react-query';
import {FetchTransactionHistory} from '../../../api/FetchTransactionHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface TransactionType {
  date: string;
  amount: number;
  bonus?: number;
}

const TransactionList = () => {
  const transaction: TransactionType = {
    date: '12-Dec-22',
    amount: 250,
    bonus: 25,
  };
  const [transactions, _] = React.useState<TransactionType[]>([
    transaction,
    {...transaction, bonus: undefined},
    transaction,
    transaction,
  ]);

  const {} = useQuery(['TransactionHistory'], async () => {
    const id = await AsyncStorage.getItem('id');
    if (id) {
      FetchTransactionHistory(id);
    }
  });

  return (
    <View style={styles.root}>
      <FlatList
        data={transactions}
        renderItem={({item}) => <Transaction transaction={item} />}
      />
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: layout.width,
  },
});
