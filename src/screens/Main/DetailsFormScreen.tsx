import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {layout} from '../../constants/layout';
import {colors} from '../../themes/colors';
import InputFields from '../../components/MainComponents/DetailsFormScreenComponents/InputFields';
import {fonts} from '../../themes/fonts';

const DetailsFormScreen = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.root}>
      <View style={styles.paddingTop} />
      <Text style={styles.title}>
        Please fill your details for the astrologer
      </Text>
      <View style={styles.padding} />
      <InputFields />
    </ScrollView>
  );
};

export default {
  component: DetailsFormScreen,
  name: 'DetailsFormScreen' as const,
};

const styles = StyleSheet.create({
  root: {
    width: layout.width,
    backgroundColor: colors.palette.whiteWarm,
  },
  contentContainer: {
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.contageLight,
    fontSize: 18,
    color: colors.text,
  },
  paddingTop: {
    height: 30,
  },
  padding: {
    height: 20,
  },
});
