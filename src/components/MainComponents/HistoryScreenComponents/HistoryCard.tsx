import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../../themes/colors';
import {layout} from '../../../constants/layout';
import {fonts} from '../../../themes/fonts';
import Star from '../../../../assets/icons/HomeScreen/star.svg';
import SmallButton from '../../UI/SmallButton';
import Call from '../../../../assets/icons/HomeScreen/call.svg';
import Chat from '../../../../assets/icons/HomeScreen/chat.svg';
import File from '../../../../assets/icons/HistoryScreen/file.svg';
import Play from '../../../../assets/icons/HistoryScreen/play.svg';

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
  const rating = Array(Number(astrologer.astrologerRating)).fill(1);
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
                {'  '}[{astrologer?.astrologerLanguage}]
              </Text>
            </Text>
            <Text style={styles.text}>{astrologer.astrologerSkills}</Text>
            <Text style={styles.text}>
              Exp: {astrologer.astrologerExperience}Yrs{' '}
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
            <Text style={styles.text}>Clients: {astrologer.clients}</Text>
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
                <TouchableOpacity style={styles.button}>
                  {astrologer.chat ? <File /> : <Play />}
                  <Text style={styles.buttonText}>
                    {astrologer.chat ? 'Read Past Chat' : 'Play Past Call'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.bottomButton}>
                <SmallButton title="Call" icon={<Call />} onPress={() => {}} />
                <View style={styles.space} />
                <SmallButton title="Chat" icon={<Chat />} onPress={() => {}} />
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
