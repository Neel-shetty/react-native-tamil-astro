import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import Transaction from './Transaction';
import {layout} from '../../../constants/layout';
import {useQuery} from '@tanstack/react-query';
import {FetchTransactionHistory} from '../../../api/FetchTransactionHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';

// export interface TransactionType {
//   date: string;
//   amount: number;
//   bonus?: number;
// }

const TransactionList = () => {
  const random = useMemo(() => Math.random(), []);

  const {
    data: transactions,
    isError,
    isLoading,
    refetch,
  } = useQuery(['TransactionHistory', JSON.stringify(random)], async () => {
    const id = await AsyncStorage.getItem('id');
    if (!id) {
      return;
    }
    return FetchTransactionHistory(id);
  });

  useEffect(() => {
    console.log('mounting');
    refetch();
  }, [refetch]);

  return (
    <View style={styles.root}>
      {isLoading || !transactions ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          refreshing={isLoading}
          onRefresh={() => {
            refetch();
          }}
          data={transactions.reverse()}
          renderItem={({item}) => <Transaction transaction={item} />}
        />
      )}
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
