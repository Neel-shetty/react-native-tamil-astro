import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../themes/colors';
import Balance from '../../components/MainComponents/TransactionHistoryScreenComponents/Balance';
import TransactionList from '../../components/MainComponents/TransactionHistoryScreenComponents/TransactionList';

const TransactionHistoryScreen = () => {
  return (
    <View style={styles.root}>
      <View style={styles.balanceContainer}>
        <Balance />
      </View>
      <View style={styles.transactionContainer}>
        <TransactionList />
      </View>
    </View>
  );
};

export default {
  component: TransactionHistoryScreen,
  name: 'TransactionHistoryScreen' as const,
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.palette.white,
    flex: 1,
  },
  balanceContainer: {
    flex: 1,
  },
  transactionContainer: {
    flex: 6,
  },
});
