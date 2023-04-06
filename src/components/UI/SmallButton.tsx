import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../themes/colors';
import {fonts} from '../../themes/fonts';

const SmallButton = ({
  onPress,
  icon,
}: {
  onPress: () => void;
  icon: React.ReactNode;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      {icon}
      <Text style={styles.cost}>Chat</Text>
    </TouchableOpacity>
  );
};

export default SmallButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.palette.primary500,
    width: 61,
    height: 27,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  cost: {
    fontFamily: fonts.interRegular,
    fontSize: 14,
    color: colors.palette.gray300,
  },
});
