import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {layout} from '../../../constants/layout';
import {colors} from '../../../themes/colors';
import {fonts} from '../../../themes/fonts';
import Star from '../../../../assets/icons/HomeScreen/star.svg';
import Call from '../../../../assets/icons/HomeScreen/call.svg';
import Chat from '../../../../assets/icons/HomeScreen/chat.svg';

interface AstrologerCardProps {
  firstTime?: boolean;
  stars: number;
  title: string;
  cost: string;
  clients: string;
  experience: string;
  setVisible: (visible: boolean) => void;
}

const AstrologerCard = ({
  firstTime = false,
  cost,
  stars,
  title,
  clients,
  experience,
  setVisible,
}: AstrologerCardProps) => {
  const rating = Array(5).fill(1);

  return (
    <View style={styles.root}>
      <View style={styles.leftContainer}>
        <View style={styles.leftTopContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingNumber}>{stars} </Text>
            {rating.map((_, index) => (
              <Star key={index} />
            ))}
          </View>
        </View>
        <View style={styles.leftBottomContainer}>
          <Text style={[styles.cost, firstTime ? styles.firstTime : null]}>
            Rate: ₹{cost}/min
          </Text>
          {firstTime ? (
            <Text style={styles.free}>First Free!</Text>
          ) : (
            <Text>{''}</Text>
          )}
        </View>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.rightTopContainer}>
          <Text style={styles.cost}>Clients: {clients}+</Text>
          <Text style={styles.cost}>Exp: {experience}</Text>
        </View>
        <View style={styles.rightBottomContainer}>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}
            style={styles.buttonContainer}>
            <Call />
            <Text style={styles.cost}>Call</Text>
          </TouchableOpacity>
          <View style={styles.spacer} />
          <TouchableOpacity style={styles.buttonContainer}>
            <Chat />
            <Text style={styles.cost}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AstrologerCard;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: layout.width * 0.9,
    height: layout.height * 0.14, // TODO: change to dynamic
    backgroundColor: colors.background,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: colors.palette.accent200,
    marginVertical: 5,
  },
  leftContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  rightContainer: {
    flex: 1,
    paddingRight: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'pink',
    paddingLeft: 15,
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
  ratingNumber: {
    fontSize: 12,
    fontFamily: fonts.imprima,
    color: colors.text,
  },
  cost: {
    fontFamily: fonts.interRegular,
    fontSize: 14,
    color: colors.palette.gray300,
  },
  free: {
    fontFamily: fonts.interMedium,
    fontSize: 12,
    color: colors.palette.accent500,
  },
  leftTopContainer: {},
  leftBottomContainer: {},
  rightTopContainer: {
    alignItems: 'flex-start',
    flex: 1,
    width: '100%',
    marginLeft: 10,
  },
  rightBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    flex: 1,
    // backgroundColor: 'red',
    width: '100%',
  },
  buttonContainer: {
    backgroundColor: colors.palette.primary500,
    width: 61,
    height: 27,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  spacer: {
    width: 10,
  },
  firstTime: {
    textDecorationLine: 'line-through',
    textDecorationColor: 'red',
  },
});
