import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../../themes/colors';
import {fonts} from '../../../themes/fonts';

const Message = ({
  textAlign,
  message,
}: {
  textAlign: 'right' | 'left';
  message: string;
}) => {
  return (
    <View style={textAlign === 'right' ? styles.rRoot : styles.lRoot}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  rRoot: {
    backgroundColor: 'rgba(248, 177, 17, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    maxWidth: '60%',
    alignSelf: 'flex-end',
    marginRight: 5,
    padding: 20,
    borderRadius: 23,
    minHeight: 56,
    justifyContent: 'center',
    marginVertical: 10,
  },
  lRoot: {
    backgroundColor: 'rgba(255, 255, 255, 0.38)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    maxWidth: '60%',
    alignSelf: 'flex-start',
    marginLeft: 5,
    padding: 20,
    borderRadius: 23,
    minHeight: 56,
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    fontFamily: fonts.interRegular,
    fontSize: 14,
    color: colors.text,
  },
});
