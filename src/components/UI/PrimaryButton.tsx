import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors} from '../../themes/colors';
import {fonts} from '../../themes/fonts';
import TextTicker from 'react-native-text-ticker';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  width?: number;
}

const PrimaryButton = ({
  title,
  onPress,
  loading = false,
  width,
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, width ? {width} : null]}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <TextTicker duration={title.length * 750} style={styles.text}>
          {title}
        </TextTicker>
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
