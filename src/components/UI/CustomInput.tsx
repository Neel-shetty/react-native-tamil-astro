import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {colors} from '../../themes/colors';
import {layout} from '../../constants/layout';
import {fonts} from '../../themes/fonts';

type CustomInputPropsType = {
  placeholder: string;
  handleChange: (text: string) => void;
  handleBlur: (e: any) => void;
  value: string;
  error: string | null;
};

const CustomInput = ({
  placeholder,
  handleChange,
  handleBlur,
  value,
  error,
}: CustomInputPropsType) => {
  return (
    <View style={styles.padding}>
      <View style={styles.root}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.palette.gray500}
          onChangeText={handleChange}
          onBlur={handleBlur}
          value={value}
        />
      </View>
      <View style={styles.errorContainer}>
        <Text style={styles.error}>{error ? error : ''}</Text>
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  root: {
    borderColor: colors.palette.blackBorder,
    borderWidth: 1,
    height: 40,
    width: layout.widthp,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
  },
  input: {
    width: layout.width * 0.85,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: fonts.interRegular,
    color: colors.text,
    fontSize: 12,
  },
  error: {
    color: colors.palette.accent500,
    fontFamily: fonts.imprima,
  },
  errorContainer: {
    width: layout.width * 0.85,
    paddingLeft: 18,
  },
  padding: {
    paddingVertical: 5,
  },
});
