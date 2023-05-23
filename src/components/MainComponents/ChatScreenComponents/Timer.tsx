import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {fonts} from '../../../themes/fonts';
import {colors} from '../../../themes/colors';
import {useNavigation} from '@react-navigation/native';

const Timer = ({
  onPress,
  timeLeft,
}: {
  onPress: () => void;
  timeLeft: number | null;
}) => {
  // const navigation = useNavigation();
  // const [timer, setTimer] = React.useState(0);

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimer(timer => timer + 1);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  // function fancyTimeFormat(duration: number) {
  //   // Hours, minutes and seconds
  //   const hrs = ~~(duration / 3600);
  //   const mins = ~~((duration % 3600) / 60);
  //   const secs = ~~duration % 60;

  //   // Output like "1:01" or "4:03:59" or "123:03:59"
  //   let ret = '';

  //   if (hrs > 0) {
  //     ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  //   }

  //   ret += '' + mins + ':' + (secs < 10 ? '0' : '');
  //   ret += '' + secs;

  //   return ret;
  // }

  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={() => {
          console.log('onpress touchableopacity end chat timer')
          onPress();
          // navigation.navigate('HomeScreen');
        }}>
        <Text style={styles.text}>End Chat</Text>
      </TouchableOpacity>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{timeLeft} mins remaining</Text>
      </View>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: fonts.DiwanKufi,
    fontSize: 14,
    color: colors.palette.accent500,
  },
  time: {
    fontFamily: fonts.imprima,
    fontSize: 14,
    color: colors.text,
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
