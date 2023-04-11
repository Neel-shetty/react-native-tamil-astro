import {MediaStream, mediaDevices} from 'react-native-webrtc';

export async function getMediaDevices() {
  let mediaConstraints = {
    audio: true,
    video: {
      frameRate: 30,
      facingMode: 'user',
    },
  };

  let localMediaStream: MediaStream;
  let isVoiceOnly = false;

  try {
    const mediaStream = await mediaDevices.getUserMedia(mediaConstraints);

    if (isVoiceOnly) {
      let videoTrack = await mediaStream.getVideoTracks()[0];
      videoTrack.enabled = false;
    }

    localMediaStream = mediaStream;

    if (typeof localMediaStream !== 'boolean') {
      return localMediaStream;
    }
  } catch (err) {
    console.log('🚀 ~ file: CallSlice.ts:38 ~ call ~ err:', err);
    // Handle Error
    return null;
  }
}
