import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../../themes/colors';
import {fonts} from '../../../themes/fonts';
import Star from '../../../../assets/icons/RechargeScreen/popularStar.svg';
import {layout} from '../../../constants/layout';
import {useTranslation} from 'react-i18next';

const BalanceOptions = ({
  popular,
  amount,
  bonus,
  onPress,
}: {
  popular?: boolean;
  amount: string;
  bonus?: string;
  onPress: () => void;
}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.realRoot}>
      {popular ? (
        <View style={styles.popularContainer}>
          <Star />
          <Text style={styles.popular}>{t('Popular')}</Text>
        </View>
      ) : (
        <View style={styles.spacer} />
      )}
      <View style={styles.background}>
        <TouchableOpacity onPress={onPress} style={styles.root}>
          <Text style={styles.amount}>
            <Text style={styles.size}>₹</Text>
            {amount}
          </Text>
        </TouchableOpacity>
      </View>
      {bonus ? (
        <View style={styles.bonusContainer}>
          <Text style={styles.popular}>
            {t('Bonus')} ₹{bonus}
          </Text>
        </View>
      ) : (
        <View style={styles.spacer} />
      )}
    </View>
  );
};

export default BalanceOptions;

const styles = StyleSheet.create({
  realRoot: {
    width: layout.width / 3.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    width: 73,
    height: 41,
    backgroundColor: colors.palette.white,
    borderRadius: 10,
    elevation: 7,
  },
  root: {
    width: 73,
    height: 41,
    backgroundColor: 'rgba(248, 177, 17, 0.2)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount: {
    fontFamily: fonts.interRegular,
    color: colors.text,
    fontSize: 20,
  },
  size: {
    fontSize: 18,
  },
  popularContainer: {
    width: 73,
    height: 21,
    backgroundColor: 'rgba(249, 120, 120, 0.18)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  popular: {
    fontFamily: fonts.imprima,
    color: colors.text,
    fontSize: 12,
  },
  bonusContainer: {
    width: 73,
    height: 21,
    backgroundColor: 'rgba(249, 209, 120, 0.05)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    height: 21,
  },
});
