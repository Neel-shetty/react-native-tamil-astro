import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {layout} from '../../../constants/layout';
import {fonts} from '../../../themes/fonts';
import {colors} from '../../../themes/colors';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import RechargeScreen from '../../../screens/Main/RechargeScreen';
import {useTranslation} from 'react-i18next';
import TextTicker from 'react-native-text-ticker';

const RechargeModal = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (x: boolean) => void;
}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  return (
    <Modal
      onSwipeComplete={() => {
        setVisible(false);
      }}
      swipeDirection={'up'}
      style={styles.modal}
      backdropOpacity={0}
      isVisible={visible}>
      <View style={styles.root}>
        <View style={{flex: 1}}>
          <TextTicker duration={8000} numberOfLines={1} style={styles.text}>
            {t('Balance left for < 2 min')}
          </TextTicker>
        </View>
        <TouchableOpacity
          onPress={() => {
            //@ts-ignore
            navigation.navigate(RechargeScreen.name);
          }}
          style={styles.button}>
          <TextTicker duration={10000} style={styles.text2}>
            {t('Recharge Now')}
          </TextTicker>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default RechargeModal;

const styles = StyleSheet.create({
  root: {
    width: layout.widthp,
    height: 56,
    backgroundColor: '#FFD1D1',
    borderWidth: 1,
    borderRadius: 23,
    borderColor: 'rgba(0, 0, 0, 0.34)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    elevation: 10,
  },
  text: {
    fontFamily: fonts.interRegular,
    color: colors.text,
  },
  button: {
    width: 105,
    height: 34,
    // maxwidth: 105,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.palette.white,
  },
  text2: {
    fontFamily: fonts.DiwanKufi,
    color: colors.text,
    fontSize: 12,
    // width: 50,
  },
  modal: {
    justifyContent: 'flex-start',
    paddingTop: layout.height * 0.1,
  },
});
