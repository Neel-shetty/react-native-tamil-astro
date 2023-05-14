import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';
import {Button} from 'react-native';
import {StyleProp} from 'react-native';
import {ViewStyle} from 'react-native';
import Video from './Video';
import {getMediaDevices} from '../../utils/CallUtils';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';
import PrimaryButton from '../UI/PrimaryButton';

const Call = () => {
  const [localstream, setLocalStream] = React.useState<MediaStream | null>();
  const [remotestream, setRemoteStream] = React.useState<MediaStream | null>();
  const [gettingCall, setGettingCall] = React.useState(false);
  console.log('🚀 ~ file: Call.tsx:23 ~ Call ~ gettingCall:', gettingCall);
  const pc = React.useRef<RTCPeerConnection>();
  const connecting = React.useRef(false);

  const route = useRoute();
  const chatId = React.useMemo(() => route.params?.chatId, [route]);
  console.log('🚀 ~ file: Call.tsx:30 ~ Call ~ chatId:', chatId);

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

    // get the combined user if from the calls database
    const user = Auth().currentUser;
    const callDetails = await firestore()
      .collection('calls')
      .where('userId', '==', user?.uid)
      .get();

    const combinedUserId = callDetails.docs[0].combinedUserId;

    // document for the call
    const cRef = firestore().collection('meet').doc(combinedUserId);

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
  async function join() {
    console.log('Joining...');
    connecting.current = true;
    setGettingCall(false);

    // get the combined user if from the calls database
    const user = Auth().currentUser;
    const callDetails = await firestore()
      .collection('calls')
      .where('userId', '==', user?.uid)
      .get();

    const combinedUserId = callDetails.docs[0].combinedUserId;

    const cRef = firestore().collection('meet').doc(combinedUserId);
    const offer = (await cRef.get()).data()?.offer;

    if (offer) {
      // setup webrtc
      await setupWebRTC();

      //excchange ice candicates
      //check the paramerters, its reversed. seince the joining part is callee
      collectIceCandidates(cRef, 'callee', 'caller');

      if (pc.current) {
        pc.current.setRemoteDescription(new RTCSessionDescription(offer));

        // create answer for the call
        // update the document with answer
        const answer = await pc.current.createAnswer();
        pc.current.setLocalDescription(answer);
        const cWithAnswer = {
          answer: {
            type: answer.type,
            sdp: answer.sdp,
          },
        };
        cRef.update(cWithAnswer);
      }
    }
  }

  //helper function
  const streamCleanUpCallback = React.useCallback(
    async function streamCleanUp() {
      if (localstream) {
        localstream.getTracks().forEach(track => track.stop());
        localstream.release();
      }
      setLocalStream(null);
      setRemoteStream(null);
    },
    [localstream],
  );

  /**
   * for disconnecting the call close the connection, release the stream
   * and delete the document for the call
   */
  const hangupCallback = React.useCallback(
    async function hangup() {
      console.log('hangup');
      setGettingCall(false);
      connecting.current = false;
      streamCleanUpCallback();
      firestoreCleanUp();
      if (pc.current) {
        pc.current.close();
      }
    },
    [streamCleanUpCallback],
  );

  async function firestoreCleanUp() {
    // get the combined user if from the calls database
    const user = Auth().currentUser;
    const callDetails = await firestore()
      .collection('calls')
      .where('userId', '==', user?.uid)
      .get();

    const combinedUserId = callDetails.docs[0].combinedUserId;
    const cRef = firestore().collection('meet').doc(combinedUserId);

    if (cRef) {
      const calleeCandidate = await cRef.collection('callee').get();
      calleeCandidate.forEach(async candidate => {
        await candidate.ref.delete();
      });
      const callerCandidate = await cRef.collection('caller').get();
      callerCandidate.forEach(async candidate => {
        await candidate.ref.delete();
      });

      cRef.delete();
    }
  }

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

  React.useEffect(() => {
    // get the combined user if from the calls database
    async function getCall() {
      const user = Auth().currentUser;
      const callDetails = await firestore()
        .collection('calls')
        .where('userId', '==', user?.uid)
        .get();

      const combinedUserId = callDetails.docs[0].combinedUserId;
      const cRef = firestore().collection('meet').doc(combinedUserId);

      const subscribe = cRef.onSnapshot(async snapshot => {
        const data = snapshot.data();

        // on answer start the call
        if (
          pc.current &&
          !pc.current.remoteDescription &&
          data &&
          data.answer
        ) {
          const answer = new RTCSessionDescription(data.answer);
          await pc.current.setRemoteDescription(answer);
        }

        // if there is offer for chatid set the getting call to true
        if (data && data.offer && !connecting.current) {
          console.log('call offer exists in db');
          setGettingCall(true);
        }
      });

      //on delete of the collection call hangup
      // the other side has clicked hangup
      const subscribeDelete = cRef.collection('callee').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(async change => {
          if (change.type === 'removed') {
            hangupCallback();
          }
        });
      });

      (async function () {
        const id = await AsyncStorage.getItem('id');
        console.log('🚀 ~ file: Call.tsx:27 ~ Call ~ id:', id);
      })();

      return () => {
        subscribe();
        subscribeDelete();
      };
    }
    getCall();
  }, [hangupCallback]);

  // displays the incoming call screen
  if (gettingCall) {
    const root: StyleProp<ViewStyle> = {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'pink',
      width: '100%',
    };

    return (
      <View style={root}>
        <Text>Incoming Call!</Text>
        <Button onPress={join} title="Receive" />
        <Button onPress={hangupCallback} title="Reject" />
      </View>
    );
  }

  if (localstream) {
    return (
      <Video
        hangup={hangupCallback}
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
      {/* <Button title="Call" onPress={create} /> */}
      <PrimaryButton title="Call" onPress={create} />
    </View>
  );
};

export default Call;

const styles = StyleSheet.create({});
