import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../themes/colors';
import {layout} from '../../constants/layout';
import {fonts} from '../../themes/fonts';
import CategoryList from '../../components/MainComponents/HomeScreenComponents/CategoryList';
import AstrologerList from '../../components/MainComponents/HomeScreenComponents/AstrologerList';
import GenderOptions from '../../components/MainComponents/HomeScreenComponents/GenderOptions';
import AstrologerWaitModal from '../../components/MainComponents/HomeScreenComponents/AstrologerWaitModal';
import {useRoute} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../../router/types';
import AstrologerOptions from '../../components/MainComponents/HomeScreenComponents/AtrologerOptions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {
  setCommunicationType,
  setFlow,
  setShowGenderOptions,
} from '../../store/UiSlice';
import SupportModal from '../../components/MainComponents/HomeScreenComponents/SupportModal';
import {useTranslation} from 'react-i18next';
import NewCall from '../../components/CallComponents/NewCall';

const HomeScreen = ({navigation}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [astrologerOptionsVisible, setAstrologerOptionsVisible] =
    React.useState(false);

  // global state
  const flow = useSelector((state: RootState) => state.ui.flow);
  const showGenderOptions = useSelector(
    (state: RootState) => state.ui.showGenderOptions,
  );

  const route = useRoute<HomeScreenNavigationProp['route']>();
  const dispatch = useDispatch();

  const {t} = useTranslation();

  React.useEffect(() => {
    const astrologer = route.params?.astrologer;
    if (astrologer) {
      setShowModal(false);
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
          // onPress={() => {
          //   navigation.navigate(ChatScreen.name, {chatId: '16-17'});
          // }}
          style={styles.heading}>
          {t('In which area of life do you want guidance?')}
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
          onPress={() => navigation.navigate(NewCall.name)}>
          {t('Choose Astrologer Category')}
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
      <AstrologerWaitModal visible={showModal} setVisible={setShowModal} />
      <SupportModal
      // visible={showSupportModal}
      // setVisible={setShowSupportModal}
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
    textAlign: 'center',
  },
  padding1: {
    height: layout.height * 0.02,
  },
  bottomSpacer: {
    maxHeight: 25,
    flex: 1,
  },
});
