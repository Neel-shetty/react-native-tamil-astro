import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import Modal from 'react-native-modal';
import {layout} from '../../../constants/layout';
import {colors} from '../../../themes/colors';
import {fonts} from '../../../themes/fonts';
import Star from '../../../../assets/icons/HomeScreen/star.svg';
import {HomeScreenNavigationProp} from '../../../router/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import ChatScreen from '../../../screens/Main/ChatScreen';
import {useQuery} from '@tanstack/react-query';
import {
  AssignAstrologer,
  AssignedAstrologerType,
} from '../../../api/AssignAstrologer';
import Auth from '@react-native-firebase/auth';
import FireStore from '@react-native-firebase/firestore';
import CallScreen from '../../../screens/Main/CallScreen';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {useTranslation} from 'react-i18next';
import {setShowAstrologerWaitModal} from '../../../store/UiSlice';

const AstrologerWaitModal = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) => {
  const [stars, setStars] = React.useState<string[]>(['1', '1', '1', '1']);
  const [countdown, setCountdown] = React.useState(5);
  // const [timeInSeconds, setTimeInSeconds] = React.useState(0);
  // console.log('🚀 ~ file: AstrologerWaitModal.tsx:33 ~ stars:', stars);
  const navigation = useNavigation<HomeScreenNavigationProp['navigation']>();
  const route = useRoute<HomeScreenNavigationProp['route']>();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const communicationType = useSelector(
    (state: RootState) => state.ui.communicationType,
  );
  console.log(
    '🚀 ~ file: AstrologerWaitModal.tsx:39 ~ communicationType:',
    communicationType,
  );
  const astrologerGender = useSelector(
    (state: RootState) => state.ui.astrologerGender,
  );
  const astrologerCategoryId = useSelector(
    (state: RootState) => state.ui.astrologerCategoryId,
  );

  const {
    data: astrologer,
    error,
    isLoading,
  } = useQuery(
    ['assign-astrologer', visible],
    visible
      ? () => {
          return AssignAstrologer({astrologerCategoryId, astrologerGender});
        }
      : () => null,
  );
  console.log('🚀 ~ file: AstrologerWaitModal.tsx:49 ~ error:', error);

  // React.useEffect(() => {
  //   if (!astrologer) {
  //     return;
  //   }
  //   //
  //   setStars();
  // }, [astrologer]);

  const combinedUserId = React.useMemo(() => {
    const user = Auth().currentUser;
    if (!user || !astrologer) {
      return null;
    }
    return Number(user?.uid) > Number(astrologer.id)
      ? `${astrologer.id}-${user?.uid}`
      : `${user?.uid}-${astrologer.id}`;
  }, [astrologer]);
  console.log(
    '🚀 ~ file: AstrologerWaitModal.tsx:64 ~ combinedUserId ~ combinedUserId:',
    combinedUserId,
  );

  //use Effect for chat
  useEffect(() => {
    console.log('use Effect running');
    console.log(astrologer);
    // create chat between user and astrologer
    async function createChat() {
      if (communicationType === 'chat' && astrologer && visible) {
        const user = Auth().currentUser;
        console.log(
          '🚀 ~ file: AstrologerWaitModal.tsx:45 ~ useEffect ~ user:',
          user?.uid,
        );

        const combinedUid =
          Number(user?.uid) > Number(astrologer.id)
            ? //@ts-ignore
              `${astrologer.id}-${user?.uid}`
            : //@ts-ignore
              `${user?.uid}-${astrologer.id}`;
        console.log(
          '🚀 ~ file: AstrologerWaitModal.tsx:51 ~ useEffect ~ combinedUserId:',
          combinedUid,
        );
        const doc = await FireStore()
          .collection('chats')
          .doc(combinedUid)
          .get();

        if (doc.exists) {
          return;
        }
        let languages = '';
        if (astrologer.speak_hindi) {
          languages += ' Hindi ';
        }
        if (astrologer.speak_english) {
          languages += ' English ';
        }
        if (astrologer.speak_tamil) {
          languages += ' Tamil ';
        }

        FireStore().collection('chats').doc(combinedUid).set({
          messages: [],
          userId: user?.uid,
          astrologerId: astrologer.id,
          astologerImage: astrologer.image,
          astrologerName: astrologer.name,
          astrologerRating: astrologer.rating,
          astrologerPrice: 12,
          atrologerSkills: astrologer.skills,
          astrologerExperience: astrologer.experience,
          astrologerClients: astrologer.clients,
          chat: true,
          time: FireStore.FieldValue.serverTimestamp(),
          languages,
          combinedUid,
          userName: route.params?.name,
          // astrologerPrice: astrologer.,
        });
      }
    }

    createChat();
  }, [astrologer, communicationType, visible, route.params?.name]);

  // use effect for call
  useEffect(() => {
    // create call between user and astrologer
    console.log('use Effect 2 running');
    if (communicationType === 'call' && astrologer && visible) {
      console.log('call use effect running');
      const user = Auth().currentUser;
      const combinedUid =
        Number(user?.uid) > Number(astrologer.id)
          ? //@ts-ignore
            `${astrologer.id}-${user?.uid}`
          : //@ts-ignore
            `${user?.uid}-${astrologer.id}`;
      console.log(
        '🚀 ~ file: AstrologerWaitModal.tsx:51 ~ useEffect ~ combinedUserId:',
        combinedUid,
      );
      // navigation.navigate(CallScreen.name, {
      //   combinedUserId: combinedUid,
      // });
    }
  }, [astrologer, visible, communicationType, navigation]);

  useEffect(() => {
    if (astrologer) {
      const rating = Array(astrologer.rating).fill('1');
      setStars(rating);
    }
  }, [astrologer]);

  useEffect(() => {
    // create a 10 seconds countdown
    if (!visible) {
      return;
    }
    const timer = setTimeout(() => {
      navigateToNextScreen(
        route,
        communicationType,
        setVisible,
        navigation,
        combinedUserId,
        astrologer,
        dispatch,
      );
      setCountdown(5);
      // TODO : remove this
    }, 5000);
    return () => clearTimeout(timer);
  }, [
    setVisible,
    combinedUserId,
    communicationType,
    navigation,
    route,
    visible,
    astrologer,
    dispatch,
  ]);

  //effect to create a 5 seconds countdown
  useEffect(() => {
    if (!visible) {
      return;
    }
    const timer = setTimeout(() => {
      setCountdown(cntdn => cntdn - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown, visible]);

  if (error) {
    setVisible(false);
    Alert.alert('Error', 'Something went wrong, please try again later');
    return null;
  }

  let languages = '';
  if (astrologer?.speak_hindi === '1') {
    languages += t(' Hindi ');
  }
  if (astrologer?.speak_english === '1') {
    languages += t(' English ');
  }
  if (astrologer?.speak_tamil === '1') {
    languages += t(' Tamil ');
  }

  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      backdropColor={'#FEF0F0'}
      // onBackdropPress={() => setVisible(false)}
      // onSwipeComplete={() => setVisible(false)}
      // swipeDirection="down"
      backdropOpacity={0.5}>
      <View style={styles.root}>
        {isLoading || !astrologer ? (
          <ActivityIndicator size="large" color={colors.palette.primary500} />
        ) : (
          <>
            <Text style={styles.title}>{t('Your assigned Astrologer')}</Text>
            <View style={styles.profileContainer}>
              <Image
                style={styles.profileBg}
                source={require('../../../../assets/images/profile-bg.png')}
              />
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: astrologer.image}} />
              </View>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{astrologer.name}</Text>
              <View style={styles.starContainer}>
                {stars.map((__, index) => (
                  <Star key={index} />
                ))}
              </View>
              <Text style={styles.infoText}>
                {t('Clients')}: {astrologer.clients}
              </Text>
              <Text style={styles.infoText}>
                {t('Experience')}: {astrologer.experience}Yrs
              </Text>
              <Text numberOfLines={1} style={styles.infoText}>
                {t('Language')}: {languages}
              </Text>
              <Text numberOfLines={1} style={styles.infoText}>
                {t('Skills')}: {astrologer.skills}
              </Text>
            </View>
            <View style={styles.subTitleContainer}>
              <Text
                onPress={() => {
                  // navigateToNextScreen(
                  //   route,
                  //   communicationType,
                  //   setVisible,
                  //   navigation,
                  //   combinedUserId,
                  // );
                }}
                style={[styles.subTitle]}>
                {t('Astrologer')}{' '}
                {communicationType === 'chat' ? t('Chat') : t('Call')}{' '}
                {/* {t(communicationType)}  */}
                {t('connecting')} {'\n'}
                <Text style={{color: colors.palette.primary500}}>
                  {t('Entering')}{' '}
                  {communicationType === 'chat' ? t('Chat') : t('Call')}{' '}
                  {/* {t('in 5 seconds')} */}
                  {t('in ')}
                  {countdown}
                  {t(' seconds')}
                </Text>
              </Text>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export default AstrologerWaitModal;

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
    fontSize: 14,
    fontFamily: fonts.contageRegular,
    color: colors.text,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileBg: {
    position: 'absolute',
  },
  imageContainer: {
    // position: 'absolute',
  },
  image: {
    borderRadius: 100,
    height: 53,
    width: 54,
    // marginRight: 10,
  },
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 12,
    fontFamily: fonts.DiwanKufi,
    color: colors.palette.gray500,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: fonts.contageRegular,
    color: colors.palette.gray500,
    textAlign: 'center',
  },
  subTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
});

function navigateToNextScreen(
  route: any,
  communicationType: string,
  setVisible: (visible: boolean) => void,
  navigation: any,
  combinedUserId: string | null,
  astrologer?: AssignedAstrologerType | null,
  dispatch?: any,
) {
  if (
    route.params?.communicationType === 'chat' ||
    communicationType === 'chat'
  ) {
    setVisible(false);
    navigation.navigate(ChatScreen.name, {
      chatId: combinedUserId as string,
    });
  }
  if (
    route.params?.communicationType === 'call' ||
    communicationType === 'call'
  ) {
    setVisible(false);
    navigation.navigate(CallScreen.name, {
      combinedUserId,
      astrologerPrice: astrologer?.price,
      astrologerName: astrologer?.name,
      astrologerId: astrologer?.id,
    });
  }
  setVisible(false);
  dispatch(setShowAstrologerWaitModal(false));
}
