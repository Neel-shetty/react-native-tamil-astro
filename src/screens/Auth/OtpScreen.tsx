import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AuthScaffold from '../../components/AuthComponents/AuthScaffold';

const OtpScreen = () => {
  return (
    <AuthScaffold>
      <View style={styles.root}>
        <Text>OtpScreen</Text>
      </View>
    </AuthScaffold>
  );
};

export default {component: OtpScreen, name: 'OtpScreen' as const};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
