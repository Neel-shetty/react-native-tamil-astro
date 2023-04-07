import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';

const FeedbackModal = () => {
  return (
    <Modal style={styles.modal} isVisible={true}>
      <View style={styles.root}>
        <Text>FeedbackModal</Text>
      </View>
    </Modal>
  );
};

export default FeedbackModal;

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {},
});
