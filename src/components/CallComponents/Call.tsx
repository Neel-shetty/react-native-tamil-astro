import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MediaStream, RTCPeerConnection} from 'react-native-webrtc';
import {Button} from 'react-native';
import {StyleProp} from 'react-native';
import {ViewStyle} from 'react-native';

const Call = () => {
  const [localstream, setLocalStream] = React.useState<MediaStream | null>();
  const [remotestream, setRemoteStream] = React.useState<MediaStream | null>();
  const [gettingCall, setGettingCall] = React.useState(false);
  const pc = React.useRef<RTCPeerConnection>();
  const connecting = React.useRef(false);

  async function setupWebRTC() {
    pc.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    });
  }

  async function create() {}
  async function join() {}
  async function hangup() {}

  if (gettingCall) {
    const root: StyleProp<ViewStyle> = {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    };
    return (
      <View style={root}>
        <Text>Incoming Call!</Text>
        <Button onPress={join} title="Receive" />
        <Button onPress={hangup} title="Reject" />
      </View>
    );
  }

  if (localstream) {
    return null;
  }

  return (
    <View>
      <Text>Call</Text>
    </View>
  );
};

export default Call;

const styles = StyleSheet.create({});
