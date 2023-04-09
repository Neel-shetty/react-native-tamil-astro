import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import Modal from 'react-native-modal';
import {layout} from '../../../constants/layout';
import {colors} from '../../../themes/colors';
import {fonts} from '../../../themes/fonts';
import Star from '../../../../assets/icons/HomeScreen/star.svg';
import {HomeScreenNavigationProp} from '../../../router/types';
import {useNavigation} from '@react-navigation/native';
import ChatScreen from '../../../screens/Main/ChatScreen';

const AstrologerWaitModal = ({
  visible,
  astroId,
  setVisible,
}: {
  visible: boolean;
  astroId: string;
  setVisible: (visible: boolean) => void;
}) => {
  const [astrologer, _] = React.useState({
    name: 'Kethan Swami',
    stars: 5,
    clients: 6234,
    experience: 10,
    language: 'English, Tamil',
    skills: 'Vedic, Numerology, Tarot',
  });
  const rating = Array(astrologer.stars).fill(1);
  const navigation = useNavigation<HomeScreenNavigationProp['navigation']>();

  async function fetchAstrologer(id: string) {
    console.log('astroId', id);
  }

  useEffect(() => {
    fetchAstrologer(astroId);
  }, [astroId]);

  //mock waiting time
  const [time, setTime] = React.useState(0);
  console.log('🚀 ~ file: AstrologerWaitModal.tsx:42 ~ time:', time);
  useEffect(() => {
    if (visible === false) return;
    const interval = setInterval(() => {
      setTime(time => time + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [visible]);

  useEffect(() => {
    if (time === 5) {
      navigation.navigate(ChatScreen.name);
      setVisible(false);
    }
  }, [time, setVisible, navigation]);

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
            {rating.map((__, index) => (
              <Star key={index} />
            ))}
          </View>
          <Text style={styles.infoText}>Clients: {astrologer.clients}</Text>
          <Text style={styles.infoText}>
            Experience: {astrologer.experience}Yrs
          </Text>
          <Text style={styles.infoText}>Language: {astrologer.language}</Text>
          <Text style={styles.infoText}>Skills: {astrologer.skills}</Text>
        </View>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>
            Astrologer Call connecting within {'5'} Sec...{'\n'}Please wait!
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
