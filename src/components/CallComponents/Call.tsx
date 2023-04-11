import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
} from 'react-native-webrtc';
import {Button} from 'react-native';
import {StyleProp} from 'react-native';
import {ViewStyle} from 'react-native';
import Video from './Video';
import {getMediaDevices} from '../../utils/CallUtils';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {FirebaseInstallationsTypes} from '@react-native-firebase/installations';

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

    // get the audio and video for the call
    const stream = await getMediaDevices();
    if (stream) {
      setLocalStream(stream);
      stream.getTracks().forEach(track => pc.current.addTrack(track, stream));
    }

    pc.current.addEventListener('track', event => {
      const remote = new MediaStream();
      remote.addTrack(event.track);
      setRemoteStream(remote);
    });
  }

  async function create() {
    console.log('Calling...');
    connecting.current = true;

    // setup the WebRTC connection
    await setupWebRTC();

    // document for the call
    const cRef = firestore().collection('meet').doc('chatId');

    // Exchange ICE candidates
    collectIceCandidates(cRef, 'caller', 'callee');

    if (pc.current) {
      // create offer for the call
      // store the offer under the document
      const offer = await pc.current.createOffer();
      pc.current.setLocalDescription(offer);

      const cWithOffer = {
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
      };

      cRef.set(cWithOffer);
    }
  }
  async function join() {}
  async function hangup() {}

  //helper function
  const collectIceCandidates = async (
    cRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
    localName: string,
    remoteName: string,
  ) => {
    const candidateCollection = cRef.collection(localName);

    if (pc.current) {
      //add the ICE candidates to the firestore document
      pc.current.addEventListener('icecandidate', event => {
        // When you find a null candidate then there are no more candidates.
        // Gathering of candidates has finished.
        if (!event.candidate) {
          return;
        }

        candidateCollection.add(event.candidate);

        // Send the event.candidate onto the person you're calling.
        // Keeping to Trickle ICE Standards, you should send the candidates immediately.
      });
    }

    cRef.collection(remoteName).onSnapshot(snapshot => {
      snapshot.docChanges().forEach(async (change: any) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.current?.addIceCandidate(candidate);
        }
      });
    });
  };

  // displays the incoming call screen
  if (gettingCall) {
    const root: StyleProp<ViewStyle> = {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'pink',
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
    return (
      <Video
        hangup={hangup}
        remoteStream={remotestream}
        localStream={localstream}
      />
    );
  }

  if (localstream) {
    return null;
  }

  //display call button
  return (
    <View>
      <Button title="Call" onPress={create} />
    </View>
  );
};

export default Call;

const styles = StyleSheet.create({});
