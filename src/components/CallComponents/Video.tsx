import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import {MediaStream, RTCView} from 'react-native-webrtc';

interface Props {
  hangup: () => void;
  localStream?: MediaStream | null;
  remoteStream?: MediaStream | null;
}

const Video = (props: Props) => {
  if (props.localStream && !props.remoteStream) {
    return (
      <View style={styles.localStreamContainer}>
        <RTCView
          style={styles.video}
          streamURL={props.localStream.toURL()}
          objectFit="cover"
        />
        <Button title="Hang up" onPress={props.hangup} />
      </View>
    );
  }

  if (props.localStream && props.remoteStream) {
    return (
      <View style={styles.localStreamContainer}>
        <RTCView
          style={styles.video}
          streamURL={props.remoteStream.toURL()}
          objectFit="cover"
        />
        <RTCView
          style={styles.videoLocal}
          streamURL={props.localStream.toURL()}
          objectFit="cover"
        />
        <Button title="Hang up" onPress={props.hangup} />
      </View>
    );
  }

  return (
    <View>
      <Text>Video</Text>
      <Button title="Hang up" onPress={props.hangup} />
    </View>
  );
};

export default Video;

const styles = StyleSheet.create({
  localStreamContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  videoLocal: {
    position: 'absolute',
    width: 100,
    height: 150,
    top: 20,
    left: 20,
    elevation: 10,
  },
});
