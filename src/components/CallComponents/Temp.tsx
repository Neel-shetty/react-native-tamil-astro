import {View} from 'react-native';
import React from 'react';
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {useNavigation, useRoute} from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';

const Temp = () => {
  const navigation = useNavigation();
  const id = Auth().currentUser?.uid;
  const route: any = useRoute();

  return (
    <View style={{flex: 1}}>
      <ZegoUIKitPrebuiltCall
        appID={572938071}
        appSign={
          'f6baf179282f742eeed83d3b8cc25e42be61696205162015126658a89d29c309'
        }
        userID={id} // userID can be something like a phone number or the user id on your own user system.
        userName={'test 2'}
        callID={route.params?.combinedUserId} // callID can be any unique string.
        config={{
          // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onOnlySelfInRoom: () => {
            //@ts-ignore
            navigation.navigate('HomeScreen');
          },
          onHangUp: () => {
            //@ts-ignore
            navigation.navigate('HomeScreen');
          },
        }}
      />
    </View>
  );
};

export default Temp;
