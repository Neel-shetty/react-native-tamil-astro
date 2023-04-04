import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../themes/colors';
import {fonts} from '../../themes/fonts';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
}

const SquareButton = ({title, onPress}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SquareButton;

const styles = StyleSheet.create({
  container: {
    width: 102,
    height: 97,
    borderRadius: 23,
    backgroundColor: colors.palette.primary500,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontFamily: fonts.interMedium,
    fontSize: 16,
    color: colors.palette.buttonText,
    textAlign: 'center',
  },
});
