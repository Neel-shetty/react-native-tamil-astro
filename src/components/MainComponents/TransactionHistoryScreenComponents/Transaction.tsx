import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {layout} from '../../../constants/layout';
import {fonts} from '../../../themes/fonts';
import {colors} from '../../../themes/colors';
import {TransactionType} from './TransactionList';

const Transaction = ({transaction}: {transaction: TransactionType}) => {
  return (
    <View style={styles.root}>
      <View style={styles.leftContainer}>
        <Text style={styles.recharge}>Recharge</Text>
        <Text style={styles.date}>{transaction.date}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.amount}>+ ₹ {transaction.amount}</Text>
        <Text style={styles.bonus}>
          {transaction.bonus ? '*Bonus' : ''}
          {transaction.bonus}
        </Text>
      </View>
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  root: {
    width: layout.widthp,
    height: 52,
    backgroundColor: 'rgba(254, 239, 207, 0.11)',
    borderRadius: 9,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  leftContainer: {
    marginLeft: 16,
  },
  rightContainer: {
    marginRight: 16,
  },
  recharge: {
    fontFamily: fonts.interSemiBold,
    color: colors.text,
  },
  date: {
    fontFamily: fonts.interLight,
    color: colors.text,
  },
  amount: {
    fontFamily: fonts.interSemiBold,
    color: colors.palette.green,
  },
  bonus: {
    fontFamily: fonts.imprima,
    fontSize: 10,
    color: colors.text,
  },
});
