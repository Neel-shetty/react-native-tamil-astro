import {StyleSheet, Text, View, Image} from 'react-native';
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

const AstrologerWaitModal = ({
  visible,
  astroId,
  setVisible,
}: {
  visible: boolean;
  astroId: string;
  setVisible: (visible: boolean) => void;
}) => {
  const [stars, setStars] = React.useState<string[]>(['1']);
  // console.log('🚀 ~ file: AstrologerWaitModal.tsx:33 ~ stars:', stars);
  const navigation = useNavigation<HomeScreenNavigationProp['navigation']>();
  const route = useRoute<HomeScreenNavigationProp['route']>();
  console.log(
    '🚀 ~ file: AstrologerWaitModal.tsx:29 ~ route:',
    route.params?.communicationType,
  );

  const {
    data: astrologer,
    error,
    isLoading,
  } = useQuery(['assign-astrologer'], AssignAstrologer);

  const combinedUserId = React.useMemo(() => {
    const user = Auth().currentUser;
    if (!user || !astrologer) return null;
    return Number(user?.uid) > Number(astrologer.id)
      ? `${astrologer.id}-${user?.uid}`
      : `${user?.uid}-${astrologer.id}`;
  }, [astrologer]);
  console.log(
    '🚀 ~ file: AstrologerWaitModal.tsx:42 ~ combinedUserId ~ combinedUserId:',
    combinedUserId,
  );

  // console.log(
  //   '🚀 ~ file: AstrologerWaitModal.tsx:38 ~ astrologer:',
  //   astrologer,
  // );
  // console.log('🚀 ~ file: AstrologerWaitModal.tsx:35 ~ data:', data, error);

  useEffect(() => {
    // create chat between user and astrologer
    if (route.params?.communicationType === 'chat' && astrologer) {
      // if (astrologer) {
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
        chat: true,
        time: FireStore.FieldValue.serverTimestamp(),
        // astrologerPrice: astrologer.,
      });
    }

    // create call between user and astrologer
    if (route.params?.communicationType === 'call' && astrologer) {
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

      navigation.navigate(CallScreen.name, {
        combinedUserId,
      });
    }
  }, [astrologer, route.params?.communicationType]);

  useEffect(() => {
    if (astrologer) {
      const rating = Array(Number(astrologer.rating)).fill('1');
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

  if (isLoading || !astrologer) {
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
          <Text style={styles.infoText}>Language: {astrologer?.language}</Text>
          <Text style={styles.infoText}>Skills: {astrologer.skills}</Text>
        </View>
        <View style={styles.subTitleContainer}>
          <Text
            onPress={() => {
              if (route.params?.communicationType === 'chat') {
                navigation.navigate(ChatScreen.name, {chatId: combinedUserId});
              }
              if (route.params?.communicationType === 'call') {
                navigation.navigate(CallScreen.name, {combinedUserId});
              }
            }}
            style={styles.subTitle}>
            Astrologer Call connecting {'\n'}Please wait!
          </Text>
        </View>
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
