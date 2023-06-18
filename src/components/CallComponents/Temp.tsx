import {View, Text} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';
import {ZegoSendCallInvitationButton} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {fonts} from '../../themes/fonts';
import {colors} from '../../themes/colors';
const Temp = () => {
  const navigation = useNavigation();
  const id = Auth().currentUser?.uid;
  const route = useRoute();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontFamily: fonts.interMedium,
          color: colors.text,
          fontSize: 18,
          marginBottom: 20,
        }}>
        Start Call With Astrologer
      </Text>
      <ZegoSendCallInvitationButton
        invitees={[
          {
            userID: JSON.stringify(route.params?.astrologerId),
            userName: 'User_' + route.params?.astrologerId,
          },
        ]}
        isVideoCall={false}
        resourceID={'zegouikit_call'} // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
      />
    </View>
  );
};

export default Temp;
