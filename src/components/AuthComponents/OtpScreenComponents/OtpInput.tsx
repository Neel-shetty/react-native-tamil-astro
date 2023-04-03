import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {layout} from '../../../constants/layout';
import {colors} from '../../../themes/colors';
import {fonts} from '../../../themes/fonts';

interface OtpInputProps {
  handleChange: (text: string) => void;
  handleBlur: (e: any) => void;
  value: string;
  error: string | null;
  resendOtp: () => void;
}

const OtpInput = ({
  handleChange,
  handleBlur,
  value,
  error,
  resendOtp,
}: OtpInputProps) => {
  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          placeholderTextColor={colors.palette.gray}
          inputMode="numeric"
          onChangeText={handleChange}
          onBlur={handleBlur}
          value={value}
          maxLength={6}
        />
      </View>
      <View style={styles.underline} />
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error ? error : null}</Text>
        <TouchableOpacity onPress={resendOtp}>
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OtpInput;

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
    fontFamily: fonts.DiwanKufi,
    width: layout.width * 0.7,
    textAlign: 'center',
    fontSize: 16,
    // backgroundColor: 'pink',
  },
  codeContainer: {
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  resendText: {
    fontFamily: fonts.interRegular,
    fontSize: 12,
    color: colors.palette.buttonText,
  },
});
