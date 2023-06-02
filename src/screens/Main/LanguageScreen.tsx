import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AuthScaffold from '../../components/AuthComponents/AuthScaffold';
import {colors} from '../../themes/colors';
import {fonts} from '../../themes/fonts';
import {layout} from '../../constants/layout';
import SquareButton from '../../components/UI/SquareButton';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {setLoggedIn} from '../../store/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const LanguageScreen = () => {
  const {i18n} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const changeLanguage = async (language: 'ta' | 'en') => {
    i18n.changeLanguage(language).catch(err => console.log(err));
    //handle navigation, set loggedIn as true
    await AsyncStorage.setItem('loggedIn', 'true');
    await AsyncStorage.setItem('language', language);
    dispatch(setLoggedIn(true));
  };

  return (
    <AuthScaffold showBanner={false}>
      <View style={styles.paddingTop} />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          விருப்பமான வாசிப்பு மொழி?{'\n'}Preferred reading language?
        </Text>
      </View>
      <View style={styles.padding} />
      <View style={styles.padding} />
      <View style={styles.buttonContainer}>
        <SquareButton
          title="தமிழ்"
          onPress={() => {
            changeLanguage('ta');
            navigation.navigate('HomeScreen');
          }}
        />
        <View style={styles.paddingH} />
        <SquareButton
          title="English"
          onPress={() => {
            changeLanguage('en');
            navigation.navigate('HomeScreen');
          }}
        />
      </View>
    </AuthScaffold>
  );
};

export default {component: LanguageScreen, name: 'LanguageScreen' as const};

const styles = StyleSheet.create({
  titleText: {
    color: colors.text,
    fontFamily: fonts.interMedium,
    fontSize: 16,
    textAlign: 'center',
    // textShadowColor: colors.textStroke,
    // textShadowRadius: 1,
  },
  titleContainer: {
    width: layout.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: layout.widthp,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  paddingTop: {
    height: layout.height * 0.1,
  },
  padding: {
    height: layout.height * 0.02,
  },
  paddingH: {
    width: layout.width * 0.05,
  },
});
