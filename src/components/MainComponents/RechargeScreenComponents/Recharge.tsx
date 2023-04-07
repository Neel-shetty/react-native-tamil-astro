import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import PrimaryButton from '../../UI/PrimaryButton';
import {layout} from '../../../constants/layout';
import {fonts} from '../../../themes/fonts';
import {colors} from '../../../themes/colors';
import {Formik} from 'formik';
import BalanceOptions from './BalanceOptions';

const Recharge = () => {
  return (
    <View style={styles.root}>
      <View style={styles.balanceContainer}>
        <Text style={styles.title}>Available Balance</Text>
        {/* <Text>₹250</Text> */}
        <Text style={styles.amount}>
          <Text style={styles.size20}>₹</Text>250
        </Text>
        <View style={styles.addMoneyContainer}>
          <Formik
            initialValues={{amount: ''}}
            onSubmit={values => console.log(values)}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <>
                <TextInput
                  placeholder="Enter Amount"
                  placeholderTextColor={'#DCD4D4'}
                  style={styles.input}
                  onChangeText={handleChange('amount')}
                  onBlur={handleBlur('amount')}
                  value={values.amount}
                  keyboardType="numeric"
                />
                <PrimaryButton onPress={handleSubmit} title="Add Money" />
              </>
            )}
          </Formik>
        </View>
      </View>
      {/* recharge options */}
      <View style={styles.rechargeOptionsContainer}>
        <Text>Quick Balance Options</Text>
        <BalanceOptions />
      </View>
    </View>
  );
};

export default Recharge;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  balanceContainer: {
    width: layout.widthp,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  addMoneyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: layout.widthp,
  },
  input: {
    width: layout.width * 0.5,
    fontFamily: fonts.interRegular,
    fontSize: 14,
    color: colors.text,
    borderWidth: 1,
    paddingVertical: 0,
    borderColor: 'rgba(0,0,0,0.25)',
  },
  title: {
    fontFamily: fonts.contageRegular,
    fontSize: 18,
    color: '#5C5757',
  },
  amount: {
    fontFamily: fonts.interSemiBold,
    fontSize: 24,
    color: colors.text,
  },
  size20: {
    fontSize: 20,
  },
  rechargeOptionsContainer: {
    width: layout.widthp,
    flex: 4,
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
