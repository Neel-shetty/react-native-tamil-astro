import {StyleSheet, View} from 'react-native';
import React from 'react';
import Recharge from '../../components/MainComponents/RechargeScreenComponents/Recharge';
import {colors} from '../../themes/colors';

const RechargeScreen = () => {
  return (
    <View style={styles.root}>
      <Recharge />
    </View>
  );
};

export default {component: RechargeScreen, name: 'RechargeScreen' as const};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.palette.white,
  },
});
