import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {colors} from '../../../themes/colors';
import {layout} from '../../../constants/layout';
import {fonts} from '../../../themes/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {setShowSupportModal} from '../../../store/UiSlice';
import {useTranslation} from 'react-i18next';
import TextTicker from 'react-native-text-ticker';
// import {TouchableOpacity} from 'react-native-gesture-handler';

const SupportModal = () => {
  const visible = useSelector((state: RootState) => state.ui.showSupportModal);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      backdropColor={'#FEF0F0'}
      onBackdropPress={() => dispatch(setShowSupportModal(false))}
      onSwipeComplete={() => dispatch(setShowSupportModal(false))}
      swipeDirection={['down', 'up', 'left', 'right']}
      backdropOpacity={0.5}>
      <View style={styles.root}>
        <Text style={styles.title}>
          {t('We are always here to resolve your queries')}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log('pressed');
            Linking.openURL('https://wa.me/919174704175');
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              overflow: 'hidden',
              padding: 10,
            }}>
            <Image
              source={require('../../../../assets/images/whatsappLogo.png')}
            />
            <TextTicker duration={10000} style={styles.buttonText}>
              {t('Whatsapp Us')}
            </TextTicker>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default SupportModal;

const styles = StyleSheet.create({
  modal: {
    // backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    // height: layout.height * 0.5,
    // width: layout.widthp * 0.5,
    alignSelf: 'center',
  },
  root: {
    backgroundColor: colors.palette.white,
    width: layout.width * 0.8,
    // height: layout.height * 0.5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    elevation: 10,
  },
  title: {
    fontFamily: fonts.contageRegular,
    fontSize: 14,
    color: colors.text,
  },
  button: {
    height: 38,
    width: 165,
    borderWidth: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 20,
  },
  buttonText: {
    fontFamily: fonts.DiwanKufi,
    flex: 1,
    marginLeft: 5,
  },
});
