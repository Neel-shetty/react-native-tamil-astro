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
import {AssignAstrologer} from '../../../api/AssignAstrologer';
import Auth from '@react-native-firebase/auth';
import FireStore from '@react-native-firebase/firestore';
import CallScreen from '../../../screens/Main/CallScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';

const AstrologerWaitModal = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) => {
  const [stars, setStars] = React.useState<string[]>(['1']);
  // console.log('🚀 ~ file: AstrologerWaitModal.tsx:33 ~ stars:', stars);
  const navigation = useNavigation<HomeScreenNavigationProp['navigation']>();
  const route = useRoute<HomeScreenNavigationProp['route']>();
  const communicationType = useSelector(
    (state: RootState) => state.ui.communicationType,
  );
  console.log(
    '🚀 ~ file: AstrologerWaitModal.tsx:39 ~ communicationType:',
    communicationType,
  );

  const {
    data: astrologer,
    error,
    isLoading,
  } = useQuery(
    ['assign-astrologer', visible],
    visible ? AssignAstrologer : () => null,
  );
  console.log('🚀 ~ file: AstrologerWaitModal.tsx:49 ~ error:', error);

  const combinedUserId = React.useMemo(() => {
    const user = Auth().currentUser;
    if (!user || !astrologer) return null;
    return Number(user?.uid) > Number(astrologer.id)
      ? `${astrologer.id}-${user?.uid}`
      : `${user?.uid}-${astrologer.id}`;
  }, [astrologer]);

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
          user.uid,
        );

        const combinedUserId =
          Number(user?.uid) > Number(astrologer.id)
            ? //@ts-ignore
              `${astrologer.id}-${user?.uid}`
            : //@ts-ignore
              `${user?.uid}-${astrologer.id}`;
        console.log(
          '🚀 ~ file: AstrologerWaitModal.tsx:51 ~ useEffect ~ combinedUserId:',
          combinedUserId,
        );
        const doc = await FireStore()
          .collection('chats')
          .doc(combinedUserId)
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

        FireStore().collection('chats').doc(combinedUserId).set({
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
          // astrologerPrice: astrologer.,
        });
      }
    }

    createChat();
  }, [astrologer, communicationType, visible]);

  // use effect for call
  useEffect(() => {
    // create call between user and astrologer
    console.log('use Effect 2 running');
    if (communicationType === 'call' && astrologer && visible) {
      console.log('call use effect running');
      const user = Auth().currentUser;
      const combinedUserId =
        Number(user?.uid) > Number(astrologer.id)
          ? //@ts-ignore
            `${astrologer.id}-${user?.uid}`
          : //@ts-ignore
            `${user?.uid}-${astrologer.id}`;
      console.log(
        '🚀 ~ file: AstrologerWaitModal.tsx:51 ~ useEffect ~ combinedUserId:',
        combinedUserId,
      );
      FireStore().collection('calls').doc().set({
        userId: user?.uid,
        astrologerId: astrologer.id,
        astologerImage: astrologer.image,
        astrologerName: astrologer.name,
        astrologerRating: astrologer.rating,
        astrologerPrice: 12,
        atrologerSkills: astrologer.skills,
        astrologerExperience: astrologer.experience,
        time: FireStore.FieldValue.serverTimestamp(),
        combinedUserId,
      });
    }
  }, [astrologer, visible, communicationType]);

  useEffect(() => {
    if (astrologer) {
      const rating = Array(astrologer.rating).fill('1');
      setStars(rating);
    }
  }, [astrologer]);

  // useEffect(() => {
  //   // create a 10 seconds countdown
  //   // const timer = setTimeout(() => {
  //   //   // setVisible(false);
  //   // }, 10000);
  //   // return () => clearTimeout(timer);
  // }, [setVisible]);

  if (error) {
    setVisible(false);
    Alert.alert('Error', 'Something went wrong, please try again later');
    return null;
  }

  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      backdropColor={'#FEF0F0'}
      onBackdropPress={() => setVisible(false)}
      onSwipeComplete={() => setVisible(false)}
      swipeDirection="down"
      backdropOpacity={0.5}>
      <View style={styles.root}>
        {isLoading || !astrologer ? (
          <ActivityIndicator size="large" color={colors.palette.primary500} />
        ) : (
          <>
            <Text style={styles.title}>Your assigned Astrologer</Text>
            <View style={styles.profileContainer}>
              <Image
                style={styles.profileBg}
                source={require('../../../../assets/images/profile-bg.png')}
              />
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={require('../../../../assets/images/profile-pic.png')}
                />
              </View>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{astrologer.name}</Text>
              <View style={styles.starContainer}>
                {stars.map((__, index) => (
                  <Star key={index} />
                ))}
              </View>
              <Text style={styles.infoText}>Clients: {astrologer.clients}</Text>
              <Text style={styles.infoText}>
                Experience: {astrologer.experience}Yrs
              </Text>
              <Text style={styles.infoText}>
                Language: {astrologer?.language}
              </Text>
              <Text style={styles.infoText}>Skills: {astrologer.skills}</Text>
            </View>
            <View style={styles.subTitleContainer}>
              <Text
                onPress={() => {
                  if (
                    route.params?.communicationType === 'chat' ||
                    communicationType === 'chat'
                  ) {
                    setVisible(false);
                    navigation.navigate(ChatScreen.name, {
                      chatId: combinedUserId,
                    });
                  }
                  if (
                    route.params?.communicationType === 'call' ||
                    communicationType === 'call'
                  ) {
                    navigation.navigate(CallScreen.name, {combinedUserId});
                  }
                }}
                style={styles.subTitle}>
                Astrologer Call connecting {'\n'} Go To {communicationType}
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
