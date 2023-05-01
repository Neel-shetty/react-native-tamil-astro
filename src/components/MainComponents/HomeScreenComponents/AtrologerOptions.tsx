import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo, useRef, useCallback, useEffect} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomBackdrop from './CustomBackdrop';
import {layout} from '../../../constants/layout';
import {fonts} from '../../../themes/fonts';
import {colors} from '../../../themes/colors';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../../../router/types';
import DetailsFormScreen from '../../../screens/Main/DetailsFormScreen';
import AstrologerList from './AstrologerList';
import {useDispatch} from 'react-redux';
import {setCommunicationType} from '../../../store/UiSlice';

interface OptionsPropsType {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const AstrologerOptions = ({visible, setVisible}: OptionsPropsType) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation<HomeScreenNavigationProp['navigation']>();

  const snapPoints = useMemo(() => ['75%'], []);
  const dispatch = useDispatch();

  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log('handleSheetChanges', index);
      if (index === -1) {
        setVisible(false);
      }
    },
    [setVisible],
  );

  useEffect(() => {
    if (visible === true) {
      console.log('visible', visible);
      bottomSheetRef.current?.snapToIndex(0);
      console.log('bottomSheetRef.current');
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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Select preferred Astrologer category</Text>
        </View>
        <View style={styles.buttonContainer}>
          <AstrologerList
            onPress={() => {
              dispatch(setCommunicationType('chat'));
              navigation.navigate(DetailsFormScreen.name, {
                communicationType: 'chat',
              });
              bottomSheetRef.current?.close();
            }}
            onPressCall={() => {
              dispatch(setCommunicationType('call'));
              navigation.navigate(DetailsFormScreen.name, {
                communicationType: 'call',
              });
              bottomSheetRef.current?.close();
            }}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default AstrologerOptions;

const styles = StyleSheet.create({
  root: {
    height: layout.height * 0.59,
    alignItems: 'center',
    justifyContent: 'center',
    width: layout.width,
    // backgroundColor: 'red',
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'pink',
    height: 20,
    flex: 1,
  },
  title: {
    fontFamily: fonts.contageLight,
    fontSize: 18,
    color: colors.text,
    // flex: 1,
  },
  buttonContainer: {
    width: '100%',
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 30,
    // backgroundColor: 'yellow',
    // height: layout.height * 0.3,
    flex: 7,
  },
});
