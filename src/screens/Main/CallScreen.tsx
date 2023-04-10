import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../themes/colors';

const CallScreen = () => {
  return (
    <View style={styles.root}>
      <Text>CallScreen</Text>
    </View>
  );
};

export default {component: CallScreen, name: 'CallScreen' as const};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.palette.white,
  },
});
