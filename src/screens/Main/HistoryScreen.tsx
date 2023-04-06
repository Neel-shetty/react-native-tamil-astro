import {StyleSheet, View} from 'react-native';
import React from 'react';
import {colors} from '../../themes/colors';
import HistoryList from '../../components/MainComponents/HistoryScreenComponents/HistoryList';

const HistoryScreen = () => {
  return (
    <View style={styles.root}>
      <HistoryList />
    </View>
  );
};

export default {component: HistoryScreen, name: 'HistoryScreen' as const};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.palette.white,
    alignItems: 'center',
    // paddingTop: 20,
    // justifyContent: 'center',
  },
});
