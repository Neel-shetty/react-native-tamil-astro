import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useMemo, useRef, useCallback, useEffect} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomBackdrop from './CustomBackdrop';
import {layout} from '../../../constants/layout';
import {fonts} from '../../../themes/fonts';
import {colors} from '../../../themes/colors';
import SquareButton from '../../UI/SquareButton';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../../../router/types';
import DetailsFormScreen from '../../../screens/Main/DetailsFormScreen';
import {useDispatch} from 'react-redux';
import {
  setAstrologerGender,
  setShowGenderOptions,
} from '../../../store/UiSlice';
import {useTranslation} from 'react-i18next';
import Icon from '../../../../assets/icons/HomeScreen/close.svg';

interface GenderOptionsPropsType {
  visible: boolean;
  flow: 'astrologer' | 'category';
  showAstrologerOptions: (x: boolean) => void;
}

const GenderOptions = ({
  visible,
  flow,
  showAstrologerOptions,
}: GenderOptionsPropsType) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation<HomeScreenNavigationProp['navigation']>();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const snapPoints = useMemo(() => ['50%'], []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log('handleSheetChanges', index);
      if (index === -1) {
        // setVisible(false);
        dispatch(setShowGenderOptions(false));
        // bottomSheetRef.current?.close();
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (visible === true) {
      console.log('visible', visible);
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  return (
    <BottomSheet
      enablePanDownToClose={true}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={CustomBackdrop}
      index={-1}
      ref={bottomSheetRef}>
      <View style={styles.root}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => bottomSheetRef.current?.close()}>
          <Icon color="black" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {t('Preferred gender of the Astrologer?')}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <SquareButton
            onPress={() => {
              if (flow === 'astrologer') {
                navigation.navigate(DetailsFormScreen.name);
                bottomSheetRef.current?.close();
                // setVisible(false);
                dispatch(setShowGenderOptions(false));
              }
              if (flow === 'category') {
                bottomSheetRef.current?.close();
                // setVisible(false);
                dispatch(setShowGenderOptions(false));
                showAstrologerOptions(true);
              }
              dispatch(setAstrologerGender('Male'));
            }}
            title={t('Male')}
          />
          <SquareButton
            onPress={() => {
              if (flow === 'astrologer') {
                navigation.navigate(DetailsFormScreen.name);
                bottomSheetRef.current?.close();
                // setVisible(false);
                dispatch(setShowGenderOptions(false));
              }
              if (flow === 'category') {
                bottomSheetRef.current?.close();
                // setVisible(false);
                dispatch(setShowGenderOptions(false));
                showAstrologerOptions(true);
              }
              dispatch(setAstrologerGender('Female'));
            }}
            title={t('Female')}
          />
          <SquareButton
            onPress={() => {
              if (flow === 'astrologer') {
                navigation.navigate(DetailsFormScreen.name);
                bottomSheetRef.current?.close();
                // setVisible(false);
                dispatch(setShowGenderOptions(false));
              }
              if (flow === 'category') {
                bottomSheetRef.current?.close();
                // setVisible(false);
                dispatch(setShowGenderOptions(false));
                showAstrologerOptions(true);
              }
              dispatch(setAstrologerGender('Other'));
            }}
            title={t('No Preference')}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default GenderOptions;

const styles = StyleSheet.create({
  root: {
    height: layout.height * 0.38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'pink',
  },
  title: {
    fontFamily: fonts.contageLight,
    fontSize: 18,
    color: colors.text,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 30,
    // backgroundColor: 'yellow',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 10,
  },
});
