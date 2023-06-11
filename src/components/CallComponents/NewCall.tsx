import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Temp from './Temp';
import {layout} from '../../constants/layout';

const NewCall = () => {
  return (
    <View style={styles.root}>
      <Text>NewCall</Text>
      <Temp />
    </View>
  );
};

export default {component: NewCall, name: 'newCall'};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: layout.height,
  },
});
