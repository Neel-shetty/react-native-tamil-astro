import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../themes/colors';
import {layout} from '../../constants/layout';
import {fonts} from '../../themes/fonts';
import {useTranslation} from 'react-i18next';

interface AuthScaffoldProps {
  children: React.ReactNode;
}

const AuthScaffold = ({children}: AuthScaffoldProps) => {
  // const {t} = useTranslation();
  return (
    <ScrollView style={styles.root}>
      <View style={styles.paddingTop} />
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/images/TamilAstro_logo1.png')}
        />
      </View>
      <View style={styles.padding} />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>தமிழருக்கான சிறந்த ஜோதிட ஆப்</Text>
        <Text style={styles.titleText}>
          Best Astrology App for Tamil Community
        </Text>
      </View>
      <View style={styles.padding} />
      <View style={styles.padding} />
      <View style={styles.banner}>
        <Text style={styles.titleText}>
          ஜோதிடருடன் முதல் அழைப்பு இலவசம்{'\n'} First Consultation with
          Astrologer is Free
        </Text>
      </View>
      {children}
    </ScrollView>
  );
};

export default AuthScaffold;

const styles = StyleSheet.create({
  root: {
    width: layout.width,
    backgroundColor: colors.palette.white,
  },
  logoContainer: {
    width: layout.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingTop: {
    height: layout.height * 0.1,
  },
  padding: {
    height: layout.height * 0.02,
  },
  titleText: {
    color: colors.text,
    fontFamily: fonts.interMedium,
    fontSize: 16,
    // textShadowColor: colors.textStroke,
    // textShadowRadius: 1,
  },
  titleContainer: {
    width: layout.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    width: layout.widthp,
    backgroundColor: colors.backgroundDim,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: colors.backgroundDimBorder,
    alignSelf: 'center',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
});
