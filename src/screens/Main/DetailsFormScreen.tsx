import {ScrollView, StyleSheet, Text} from 'react-native';
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
      <Text style={styles.title}>
        Please fill your details for the astrologer
      </Text>
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
});
