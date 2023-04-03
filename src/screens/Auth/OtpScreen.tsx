import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import AuthScaffold from '../../components/AuthComponents/AuthScaffold';
import OtpInput from '../../components/AuthComponents/OtpScreenComponents/OtpInput';
import {useNavigation, useRoute} from '@react-navigation/native';
import {OtpScreenNavigationProp} from '../../router/types';
import PrimaryButton from '../../components/UI/PrimaryButton';
import {colors} from '../../themes/colors';
import {layout} from '../../constants/layout';
import {fonts} from '../../themes/fonts';
import {VerifyOtp} from '../../api/VerifyOtp';
import {RequestOtp} from '../../api/RequestOtp';
import LanguageScreen from '../Main/LanguageScreen';
import EditIcon from '../../../assets/icons/edit.svg';

const OtpScreen = () => {
  const navigation = useNavigation<OtpScreenNavigationProp['navigation']>();
  const route = useRoute<OtpScreenNavigationProp['route']>();
  return (
    <AuthScaffold>
      <View style={styles.paddingTop} />
      <View style={styles.infoContainer}>
        <Text style={styles.grayText}>
          OTP sent on
          <Text style={{color: colors.palette.primary500}}>
            {' '}
            +91-{route.params.phone}
          </Text>
        </Text>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            navigation.goBack();
          }}>
          <EditIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.padding} />
      <Formik
        initialValues={{otp: ''}}
        onSubmit={async values => {
          console.log(values);
          // let result = await VerifyOtp({otp: values.otp});
          var result = true; // TODO: Remove this line
          if (result === true) {
            navigation.navigate(LanguageScreen.name);
          }
        }}
        // validationSchema={scheme}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <OtpInput
              handleBlur={handleBlur('otp')}
              handleChange={handleChange('otp')}
              error={touched.otp && errors.otp ? errors.otp : null}
              value={values.otp}
              resendOtp={async () => {
                await RequestOtp({phone: route.params.phone});
              }}
            />
            <View style={styles.padding} />
            <PrimaryButton title="Verify OTP" onPress={handleSubmit} />
            <View style={styles.padding} />
          </View>
        )}
      </Formik>
    </AuthScaffold>
  );
};

export default {component: OtpScreen, name: 'OtpScreen' as const};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.text,
  },
  paddingTop: {
    height: layout.height * 0.15,
  },
  padding: {
    height: layout.height * 0.02,
  },
  infoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: layout.width * 0.8,
    alignSelf: 'center',
  },
  grayText: {
    color: colors.palette.darkGray,
    fontFamily: fonts.interRegular,
    fontSize: 16,
  },
  iconContainer: {
    marginLeft: 10,
  },
});
