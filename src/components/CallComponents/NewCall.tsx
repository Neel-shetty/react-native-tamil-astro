import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Temp from './Temp';
import {layout} from '../../constants/layout';
import Timer from '../MainComponents/ChatScreenComponents/Timer';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ExpireTrial} from '../../api/ExpireTrial';
import Auth from '@react-native-firebase/auth';
import {DeductBalance} from '../../api/DeductBalance';
import {useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FetchBalance} from '../../api/FetchBalance';

const NewCall = () => {
  const [timeLeft, setTimeLeft] = React.useState<number | null>(null);
  console.log('🚀 ~ file: NewCall.tsx:13 ~ NewCall ~ timeLeft:', timeLeft);
  const [callState, setCallState] = React.useState<'active' | 'end'>('active');

  const navigation = useNavigation();
  const route = useRoute();

  const uniqueId = React.useMemo(
    () => Math.floor(100000 + Math.random() * 900000),
    [],
  );

  const {
    data: balanceData,
    error: balanceError,
    isLoading: balanceLoading,
    refetch: refecthBalance,
  } = useQuery(['userBalanceInChat'], async () => {
    const id: string = (await AsyncStorage.getItem('id')) as string;
    return FetchBalance(id);
  });

  React.useEffect(() => {
    refecthBalance();
  }, [refecthBalance]);

  React.useEffect(() => {
    /**  Effect to calculate time depending on balance   */
    console.log('calculating time left');
    function calculateTimeLeft() {
      if (!balanceData) {
        return null;
      }
      const balance = balanceData.balance;
      const astroPrice = route.params?.astrologerPrice;
      const time = Math.round(Number(balance) / astroPrice);
      setTimeLeft(time);
    }
    calculateTimeLeft();
  }, [balanceData, route.params?.astrologerPrice]);

  React.useEffect(() => {
    /** effect to reduce timer */
    const interval = setInterval(() => {
      if (callState === 'end') {
        console.log('ending timer countdown');
        return;
      }
      console.log('reducing rimer');
      setTimeLeft(timer => {
        if (timer) {
          return timer - 1;
        }
        return null;
      });
    }, 60000);
    console.log('timer reduced by 1 min');
    return () => clearInterval(interval);
  }, [setTimeLeft, callState]);

  React.useEffect(() => {
    // a function that runs every 1 minute
    const interval = setInterval(() => {
      const id = Auth().currentUser?.uid;
      console.log('This will run every 1 minute!');
      async function run() {
        console.log('running deduct balance');
        DeductBalance({
          id: id as string,
          amount: route.params?.astrologerPrice,
          uniqueId: uniqueId,
          astrologerName: route.params?.astrologerName,
        });
      }
      if (callState === 'end') {
        // clearInterval(interval);
        console.log(
          'deducting balance function exited early, no balance deducted',
        );
        return;
      }
      run();
    }, 60000);
    // if (chatState === 'end') {
    //   clearInterval(interval);
    //   return;
    // }
    return () => clearInterval(interval);
  }, [
    uniqueId,
    callState,
    route.params?.astrologerPrice,
    route.params?.astrologerName,
  ]);

  React.useEffect(() => {
    ExpireTrial();
  }, []);

  return (
    <View style={styles.root}>
      <Timer
        timeLeft={timeLeft}
        onPress={() => {
          //@ts-ignore
          navigation.navigate('HomeScreen');
        }}
      />
      <Temp />
    </View>
  );
};

export default {component: NewCall, name: 'newCall'};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: layout.width,
  },
});
