import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../themes/colors';
import {layout} from '../../constants/layout';
import {fonts} from '../../themes/fonts';
import CategoryList from '../../components/MainComponents/HomeScreenComponents/CategoryList';
import AstrologerList from '../../components/MainComponents/HomeScreenComponents/AstrologerList';
import GenderOptions from '../../components/MainComponents/HomeScreenComponents/GenderOptions';
import AstrologerWaitModal from '../../components/MainComponents/HomeScreenComponents/AstrologerWaitModal';
import {useNavigation, useRoute} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../../router/types';
import AstrologerOptions from '../../components/MainComponents/HomeScreenComponents/AtrologerOptions';
import ChatScreen from './ChatScreen';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {
  setCommunicationType,
  setFlow,
  setShowGenderOptions,
} from '../../store/UiSlice';
import CallScreen from './CallScreen';

const HomeScreen = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [astrologerOptionsVisible, setAstrologerOptionsVisible] =
    React.useState(false);
  // const [flow, setFlow] = React.useState<'astrologer' | 'category'>('category');
  const flow = useSelector((state: RootState) => state.ui.flow);
  console.log('🚀 ~ file: HomeScreen.tsx:20 ~ HomeScreen ~ flow:', flow);

  const route = useRoute<HomeScreenNavigationProp['route']>();
  const navigation = useNavigation<HomeScreenNavigationProp['navigation']>();
  const dispatch = useDispatch();
  const showGenderOptions = useSelector(
    (state: RootState) => state.ui.showGenderOptions,
  );
  console.log(
    '🚀 ~ file: HomeScreen.tsx:31 ~ HomeScreen ~ showGenderOptions:',
    showGenderOptions,
  );

  React.useEffect(() => {
    const astrologer = route.params?.astrologer;
    if (astrologer) {
      setShowModal(true);
    }
  }, [route.params?.astrologer]);

  React.useEffect(() => {
    return () => {
      dispatch(setFlow('category'));
    };
  }, [dispatch]);

  return (
    <View style={styles.root}>
      {/* <View style={styles.padding1} /> */}
      <View style={styles.headingContainer}>
        <Text
          onPress={() => {
            navigation.navigate(ChatScreen.name);
          }}
          style={styles.heading}>
          In which area of life do you want guidance?
        </Text>
      </View>
      <CategoryList
        onPress={() => {
          console.log('pressed');
          dispatch(setFlow('category'));
          // setVisible(true);
          dispatch(setShowGenderOptions(true));
        }}
      />
      <View style={styles.headingContainer}>
        <Text
          style={styles.heading}
          onPress={() => navigation.navigate(CallScreen.name)}>
          Choose Astrologer Category
        </Text>
      </View>
      <AstrologerList
        onPress={() => {
          dispatch(setFlow('astrologer'));
          dispatch(setCommunicationType('chat'));
        }}
        showGenderOptions={true}
        onPressCall={() => {
          dispatch(setFlow('astrologer'));
          dispatch(setCommunicationType('call'));
        }}
      />
      <View style={styles.bottomSpacer} />
      <GenderOptions
        showAstrologerOptions={setAstrologerOptionsVisible}
        flow={flow}
        visible={showGenderOptions}
        // setVisible={setVisible}
      />
      <AstrologerOptions
        visible={astrologerOptionsVisible}
        setVisible={setAstrologerOptionsVisible}
      />
      <AstrologerWaitModal
        astroId={route.params?.astrologer ?? ''}
        visible={showModal}
        setVisible={setShowModal}
      />
    </View>
  );
};

export default {component: HomeScreen, name: 'HomeScreen' as const};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.palette.white,
    width: layout.width,
    flex: 1,
  },
  headingContainer: {
    width: layout.width,
    backgroundColor: colors.palette.accent100,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.palette.blackOpacity10,
  },
  heading: {
    fontSize: 16,
    fontFamily: fonts.contageRegular,
    color: colors.text,
    paddingVertical: 5,
  },
  padding1: {
    height: layout.height * 0.02,
  },
  bottomSpacer: {
    maxHeight: 25,
    flex: 1,
  },
});
