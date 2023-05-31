import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {colors} from '../../../themes/colors';
import PrimaryButton from '../../UI/PrimaryButton';
import {fonts} from '../../../themes/fonts';
import Close from '../../../../assets/icons/ChatScreen/close.svg';
import {useNavigation} from '@react-navigation/native';
import RechargeScreen from '../../../screens/Main/RechargeScreen';
import {useTranslation} from 'react-i18next';

const Balance0Modal = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (value: boolean) => void;
}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  return (
    <Modal
      backdropOpacity={0.7}
      backdropColor="#D9D9D9"
      swipeDirection={['down', 'up']}
      onSwipeComplete={() => {
        setVisible(false);
      }}
      style={styles.modal}
      isVisible={visible}>
      <View style={styles.root}>
        <TouchableOpacity
          onPress={() => {
            setVisible(false);
          }}
          style={styles.closeContainer}>
          <Close />
        </TouchableOpacity>
        <Text style={styles.text}>{t('Have more questions?')}</Text>
        <PrimaryButton
          onPress={() => {
            //@ts-ignore
            navigation.navigate(RechargeScreen.name);
          }}
          title={t('Recharge and Chat')}
        />
      </View>
    </Modal>
  );
};

export default Balance0Modal;

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    height: 174,
    width: 207,
    backgroundColor: colors.palette.white,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    fontFamily: fonts.interRegular,
    color: colors.text,
  },
  closeContainer: {position: 'absolute', top: 5, right: 10},
});
