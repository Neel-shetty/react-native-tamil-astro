import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PrimaryButton from '../../UI/PrimaryButton';
import {layout} from '../../../constants/layout';
import {fonts} from '../../../themes/fonts';
import {colors} from '../../../themes/colors';

const Balance = () => {
  return (
    <View style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Available Balance</Text>
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.amount}>
          <Text style={styles.size20}>₹</Text>250
        </Text>
        <PrimaryButton onPress={() => {}} title="Recharge" />
      </View>
    </View>
  );
};

export default Balance;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    width: layout.width,
    flex: 1,
  },
  titleContainer: {
    justifyContent: 'center',
    width: layout.widthp,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.contageRegular,
    color: '#5C5757',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: layout.widthp,
    marginTop: 5,
  },
  amount: {
    fontSize: 24,
    color: colors.text,
    fontFamily: fonts.imprima,
  },
  size20: {
    fontSize: 20,
  },
});
