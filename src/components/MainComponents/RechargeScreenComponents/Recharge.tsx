import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import PrimaryButton from '../../UI/PrimaryButton';
import {layout} from '../../../constants/layout';
import {fonts} from '../../../themes/fonts';
import {colors} from '../../../themes/colors';
import {Formik} from 'formik';
import BalanceOptions from './BalanceOptions';
import RazorpayCheckout from 'react-native-razorpay';
import {api} from '../../../api';
import {useQuery} from '@tanstack/react-query';
import {FetchRecharge} from '../../../api/FetchRecharge';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FetchBalance} from '../../../api/FetchBalance';
import {RechargeBalance} from '../../../api/RechargeBalance';

const Recharge = () => {
  const {
    data: rechargeData,
    error: rechargeError,
    isLoading,
  } = useQuery(['fetchRecharge'], FetchRecharge);

  const {
    data: balanceData,
    error: balanceError,
    isLoading: balanceLoading,
  } = useQuery(['userBalance'], async () => {
    const id: string = await AsyncStorage.getItem('id');
    return FetchBalance(id);
  });

  async function pay(amount: number) {
    api.post('/create/order/id', {amount: amount}).then(res => {
      var options = {
        description: 'Balance Recharge',
        image: 'https://i.imgur.com/3g7nmJC.jpg',
        currency: 'INR',
        key: 'rzp_test_sx9x0KmOhUZ0Lb',
        amount: amount,
        name: 'Acme Corp',
        order_id: res.data.data, //Replace this with an order_id created using Orders API.
        prefill: {
          email: 'gaurav.kumar@example.com',
          contact: '9191919191',
          name: 'Gaurav Kumar',
        },
        theme: {color: colors.palette.primary500},
      };
      RazorpayCheckout.open(options)
        .then(data => {
          // handle success
          Alert.alert(`Success: ${data.razorpay_payment_id}`);
          api
            .post('/payment/details', {
              razorpay_payment_id: data.razorpay_payment_id,
              razorpay_order_id: res.data.data,
              razorpay_signature: data.razorpay_signature,
            })
            .then(() => {
              RechargeBalance({
                amount,
                transaction_id: data.razorpay_payment_id,
              });
            })
            .catch(error => {
              // handle failure
              Alert.alert(`Error: ${error.code} | ${error.description}`);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  if (rechargeError || isLoading || !rechargeData || balanceLoading) {
    return <ActivityIndicator color={colors.palette.primary500} />;
  }

  return (
    <View style={styles.root}>
      <View style={styles.balanceContainer}>
        <Text style={styles.title}>Available Balance</Text>
        <Text style={styles.amount}>
          <Text style={styles.size20}>₹</Text>
          {balanceData?.balance}
        </Text>
        <View style={styles.addMoneyContainer}>
          <Formik
            initialValues={{amount: ''}}
            onSubmit={async values => {
              console.log(values);
              await pay(parseInt(values.amount, 10));
            }}>
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
        <View style={styles.titleContainer}>
          <Text style={styles.optionTitle}>Quick Balance Options</Text>
        </View>
        {/* <BalanceOptions popular={false} amount={150} bonus={23} /> */}
        <FlatList
          data={rechargeData}
          numColumns={3}
          renderItem={({item}) => (
            <BalanceOptions
              popular={item.tag === 'Popular' ? true : false}
              amount={item.amount}
              bonus={item.bonus}
              onPress={() => {
                pay(Number(item.amount));
              }}
            />
          )}
        />
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
  optionTitle: {
    fontFamily: fonts.contageLight,
    fontSize: 14,
    color: colors.text,
  },
  titleContainer: {
    marginBottom: 10,
  },
});
