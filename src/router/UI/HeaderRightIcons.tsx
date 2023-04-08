import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Wallet from '../../../assets/icons/Navigation/wallet.svg';
import Translation from '../../../assets/icons/Navigation/translation.svg';
import {useNavigation} from '@react-navigation/native';
import RechargeScreen from '../../screens/Main/RechargeScreen';
import LanguageScreen from '../../screens/Main/LanguageScreen';

interface props {
  tintColor?: string | undefined;
  pressColor?: string | undefined;
  pressOpacity?: number | undefined;
}

const HeaderRightIcons = ({}: props) => {
  const navigation = useNavigation();
  function walletButton() {
    //@ts-ignore
    navigation.navigate(RechargeScreen.name);
  }
  function TranslationButton() {
    //@ts-ignore
    navigation.navigate(LanguageScreen.name);
  }
  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={walletButton} style={styles.buttonContainer}>
        <Wallet />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={TranslationButton}
        style={styles.buttonContainer}>
        <Translation />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRightIcons;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    paddingRight: 10,
  },
  buttonContainer: {
    marginHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
