import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AuthScaffold from '../../components/AuthComponents/AuthScaffold';
import {colors} from '../../themes/colors';

const SignInScreen = () => {
  return <AuthScaffold></AuthScaffold>;
};

export default {component: SignInScreen, name: 'SignInScreen'};

const styles = StyleSheet.create({
  text: {
    color: colors.text,
  },
});
