import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors} from '../../themes/colors';
import {fonts} from '../../themes/fonts';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

const PrimaryButton = ({
  title,
  onPress,
  loading = false,
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 35,
    borderRadius: 23,
    backgroundColor: colors.palette.primary500,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontFamily: fonts.contageLight,
    fontSize: 16,
    color: colors.palette.buttonText,
  },
});
