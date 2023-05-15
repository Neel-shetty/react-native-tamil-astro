import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {fonts} from '../../../themes/fonts';
import {colors} from '../../../themes/colors';
import {useNavigation} from '@react-navigation/native';

const Timer = () => {
  const navigation = useNavigation();
  const [timer, setTimer] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer => timer + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}>
        <Text style={styles.text}>End Chat</Text>
      </TouchableOpacity>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{timer}</Text>
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
