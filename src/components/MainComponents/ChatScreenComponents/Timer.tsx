import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {fonts} from '../../../themes/fonts';
import {colors} from '../../../themes/colors';

const Timer = () => {
  return (
    <View style={styles.root}>
      <TouchableOpacity>
        <Text style={styles.text}>End Chat</Text>
      </TouchableOpacity>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>1:22 Mins Left</Text>
      </View>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: fonts.DiwanKufi,
    fontSize: 14,
    color: colors.palette.accent500,
  },
  time: {
    fontFamily: fonts.imprima,
    fontSize: 14,
    color: colors.text,
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
