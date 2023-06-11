import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {useNavigation} from '@react-navigation/native';

const Temp = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <Text>Temp</Text>
      <ZegoUIKitPrebuiltCall
        appID={572938071}
        appSign={
          'f6baf179282f742eeed83d3b8cc25e42be61696205162015126658a89d29c309'
        }
        userID={'17'} // userID can be something like a phone number or the user id on your own user system.
        userName={'Neel'}
        callID={'16-17'} // callID can be any unique string.
        config={{
          // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onOnlySelfInRoom: () => {
            navigation.navigate('HomeScreen');
          },
          onHangUp: () => {
            navigation.navigate('HomeScreen');
          },
        }}
      />
    </View>
  );
};

export default Temp;

const styles = StyleSheet.create({});
