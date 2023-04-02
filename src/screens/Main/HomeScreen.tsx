import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const HomeScreen = () => {
  return (
    <View style={styles.root}>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default {component: HomeScreen, name: 'HomeScreen'};

const styles = StyleSheet.create({
  root: {},
});
