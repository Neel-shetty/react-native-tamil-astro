import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../../../themes/colors';
import {layout} from '../../../constants/layout';
import {fonts} from '../../../themes/fonts';
import Star from '../../../../assets/icons/HomeScreen/star.svg';
import SmallButton from '../../UI/SmallButton';
import Call from '../../../../assets/icons/HomeScreen/call.svg';
import Chat from '../../../../assets/icons/HomeScreen/chat.svg';
import File from '../../../../assets/icons/HistoryScreen/file.svg';
import Play from '../../../../assets/icons/HistoryScreen/play.svg';
import {useNavigation} from '@react-navigation/native';
import {ChatScreenNavigationProp} from '../../../router/types';
import ChatScreen from '../../../screens/Main/ChatScreen';
import firestore from '@react-native-firebase/firestore';
import {messagesType} from '../ChatScreenComponents/Chat';
import {useTranslation} from 'react-i18next';
import TextTicker from 'react-native-text-ticker';
import CallScreen from '../../../screens/Main/CallScreen';

interface HistoryCardPropTypes {
  astrologer: {
    //   name: string;
    //   language: string;
    //   skills: string;
    //   experience: string;
    //   clients: string;
    //   stars: number;
    //   chat: boolean;
    //   cost: string;
    // };

    astrologerId: number;
    astrologerExperience: string;
    astrologerImage: string;
    astrologerRating: string;
    userId: string;
    astrologerName: string;
    astrologerPrice: number;
    astrologerSkills: string;
    chat: boolean;
    messages: {message: string; uid: string}[];
    time: any;
  };
}

const HistoryCard = ({astrologer}: HistoryCardPropTypes) => {
  console.log(
    '🚀 ~ file: HistoryCard.tsx:57 ~ HistoryCard ~ astrologer:',
    astrologer,
  );
  const {t} = useTranslation();
  console.log(
    '🚀 ~ file: HistoryCard.tsx:40 ~ HistoryCard ~ astrologer:',
    astrologer.messages,
  );
  const [rating, setRating] = React.useState<string[]>(['1']);
  const [messages, setMessages] = React.useState<messagesType>([]);
  console.log('🚀 ~ file: HistoryCard.tsx:46 ~ HistoryCard ~ rating:', rating);
  const navigation = useNavigation<ChatScreenNavigationProp['navigation']>();

  useEffect(() => {
    const rate = Array(Math.round(Number(astrologer.astrologerRating))).fill(
      '1',
    );
    setRating(rate);
  }, [astrologer.astrologerRating]);

  useEffect(() => {
    async function getMessages() {
      const doc = astrologer?.combinedUid;
      // console.log('🚀 ~ file: HistoryList.tsx:54 ~ messages ~ doc:', doc);
      const fetchedMessages = await firestore()
        .collection('chats')
        .doc(doc)
        .collection('messages')
        .get();
      const idk = fetchedMessages?.docs?.map(doc => doc?.data());
      setMessages(idk as messagesType);
    }
    getMessages();
  }, [astrologer]);

  return (
    <View style={styles.background}>
      <View style={styles.root}>
        <View style={styles.topContainer}>
          <View style={styles.topleft}>
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
          </View>
          <View style={styles.topRight}>
            <Text style={styles.title} numberOfLines={1}>
              {astrologer.astrologerName}
              <Text style={styles.text}>
                {'  '}[{astrologer?.languages}]
              </Text>
            </Text>
            <Text style={styles.text}>
              {t('Skills')}:{astrologer.atrologerSkills}
            </Text>
            <Text style={styles.text}>
              {t('Exp')}: {astrologer.astrologerExperience}Yrs{' '}
            </Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomLeft}>
            <View style={styles.ratingContainer}>
              {/* <Text style={styles.ratingNumber}>{stars} </Text> */}
              {rating.map((_, index) => (
                <Star key={index} />
              ))}
            </View>
            <Text style={styles.text}>
              {t('Clients')}: {astrologer.astrologerClients}
            </Text>
          </View>
          <View style={styles.bottomRight}>
            <View style={styles.costContainer}>
              <View style={styles.idk}>
                <Text style={styles.text}>
                  ₹{astrologer.astrologerPrice}/min
                </Text>
              </View>
              <View style={styles.flex} />
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.topButton}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(ChatScreen.name, {
                      history: messages,
                    });
                  }}
                  style={styles.button}>
                  {messages.length > 0 &&
                    (astrologer.chat ? <File /> : <Play />)}
                  {messages.length > 0 && (
                    <TextTicker duration={8000} style={styles.buttonText}>
                      {astrologer.chat ? t('Read Past Chat') : 'Play Past Call'}
                    </TextTicker>
                  )}
                  {messages.length === 0 ? (
                    <ActivityIndicator
                      color={colors.palette.accent200}
                      size={'small'}
                    />
                  ) : null}
                </TouchableOpacity>
              </View>
              <View style={styles.bottomButton}>
                <SmallButton
                  title={t('Call')}
                  icon={<Call />}
                  onPress={() => {
                    navigation.navigate(CallScreen.name, {
                      combinedUserId: astrologer.combinedUid,
                      astrologerPrice: astrologer?.astrologerPrice,
                      astrologerName: astrologer?.astrologerName,
                      astrologerId: astrologer?.astrologerId,
                    });
                  }}
                />
                <View style={styles.space} />
                <SmallButton
                  title={t('Chat')}
                  icon={<Chat />}
                  onPress={() => {
                    navigation.navigate(ChatScreen.name, {
                      chatId: astrologer.combinedUid,
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.palette.white,
    elevation: 4,
    borderRadius: 23,
    marginVertical: 5,
    width: layout.width * 0.95,
    height: 159, // TODO: Change this to dynamic height
  },
  root: {
    backgroundColor: colors.background,
    width: layout.width * 0.95,
    height: 159, // TODO: Change this to dynamic height
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.palette.accent200,
  },
  topContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 10,
  },
  topleft: {
    flex: 1,
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRight: {
    flex: 2,
    // backgroundColor: 'yellow',
  },
  bottomContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 10,
  },
  bottomLeft: {
    flex: 1,
    // backgroundColor: 'coral',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 10,
  },
  bottomRight: {
    flex: 2,
    // backgroundColor: 'violet',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 20,
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
  title: {
    fontSize: 18,
    fontFamily: fonts.contageRegular,
    color: colors.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    fontFamily: fonts.interRegular,
    fontSize: 14,
    color: colors.palette.gray300,
  },
  costContainer: {
    flex: 1,
    // backgroundColor: 'red',
  },
  buttonContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor: 'green',
    // flex: 2,
    // paddingRight: 30,
    height: '100%',
  },
  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  space: {
    width: 10,
  },
  topButton: {
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: colors.palette.white,
    width: 135,
    height: 27,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.52)',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  buttonText: {
    fontFamily: fonts.interRegular,
    color: colors.palette.buttonText,
  },
  idk: {
    flex: 1,
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
  },
});
