import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {layout} from '../../../constants/layout';
import {colors} from '../../../themes/colors';
import {fonts} from '../../../themes/fonts';

interface PhoneInputProps {
  handleChange: (text: string) => void;
  handleBlur: (e: any) => void;
  value: string;
  error: string | null;
}

const PhoneInput = ({
  handleChange,
  handleBlur,
  value,
  error,
}: PhoneInputProps) => {
  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <View style={styles.codeContainer}>
          <Text style={styles.text}>+91</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Phone Number"
          placeholderTextColor={colors.palette.gray}
          inputMode="numeric"
          onChangeText={handleChange}
          onBlur={handleBlur}
          value={value}
        />
      </View>
      <View style={styles.underline} />
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error ? error : null}</Text>
      </View>
    </View>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  underline: {
    borderBottomWidth: 1,
    width: layout.width * 0.7,
    color: colors.palette.underline,
  },
  input: {
    color: colors.text,
    height: 50,
    paddingBottom: 0,
    marginBottom: 0,
    fontFamily: fonts.interRegular,
    width: layout.width * 0.55,
  },
  codeContainer: {
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: 'pink',
    width: layout.width * 0.7,
    paddingHorizontal: 10,
  },
  text: {
    color: colors.text,
    transform: [{translateY: 5}],
  },
  errorText: {
    color: colors.error,
    fontFamily: fonts.imprima,
    fontSize: 12,
  },
  errorContainer: {
    width: layout.width * 0.7,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
});
