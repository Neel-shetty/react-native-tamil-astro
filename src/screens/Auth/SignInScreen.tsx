import {StyleSheet, View} from 'react-native';
import React from 'react';
import AuthScaffold from '../../components/AuthComponents/AuthScaffold';
import {colors} from '../../themes/colors';
import PhoneInput from '../../components/AuthComponents/SignInScreenComponents/PhoneInput';
import PrimaryButton from '../../components/UI/PrimaryButton';
import {Formik} from 'formik';
import * as yup from 'yup';
import {layout} from '../../constants/layout';
import {RequestOtp} from '../../api/RequestOtp';
import {useNavigation} from '@react-navigation/native';
import OtpScreen from './OtpScreen';
import {SignInScreenNavigationProp} from '../../router/types';

const SignInScreen = () => {
  const navigation = useNavigation<SignInScreenNavigationProp['navigation']>();
  const scheme = yup.object({
    phone: yup
      .string()
      .required('Phone number is required')
      .length(10, 'Phone number should be 10 digits long'),
  });
  return (
    <AuthScaffold>
      <View style={styles.paddingTop} />
      <Formik
        initialValues={{phone: ''}}
        onSubmit={async values => {
          console.log(values);
          let result = await RequestOtp({phone: values.phone});
          // var result = true; // TODO: Remove this line
          if (result === true) {
            navigation.navigate(OtpScreen.name, {
              phone: values.phone ? values.phone : '9834567890',
            });
          }
        }}
        validationSchema={scheme}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <PhoneInput
              handleBlur={handleBlur('phone')}
              handleChange={handleChange('phone')}
              error={touched.phone && errors.phone ? errors.phone : null}
              value={values.phone}
            />
            <View style={styles.padding} />
            <PrimaryButton title="Request OTP" onPress={handleSubmit} />
            <View style={styles.padding} />
          </View>
        )}
      </Formik>
    </AuthScaffold>
  );
};

export default {component: SignInScreen, name: 'SignInScreen' as const};

const styles = StyleSheet.create({
  text: {
    color: colors.text,
  },
  paddingTop: {
    height: layout.height * 0.18,
  },
  padding: {
    height: layout.height * 0.02,
  },
});
