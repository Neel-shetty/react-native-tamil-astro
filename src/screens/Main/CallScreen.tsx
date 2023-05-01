import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../themes/colors';
import Call from '../../components/CallComponents/Call';

const CallScreen = ({navigation}) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}>
        <Text style={{color: 'black', fontSize: 16}}>Go back</Text>
      </TouchableOpacity>
      <View style={{height: 20}} />
      <Call />
    </View>
  );
};

export default {component: CallScreen, name: 'CallScreen' as const};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.palette.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
