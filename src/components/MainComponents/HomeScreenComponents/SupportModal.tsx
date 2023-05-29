import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';

const SupportModal = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      backdropColor={'#FEF0F0'}
      onBackdropPress={() => setVisible(false)}
      onSwipeComplete={() => setVisible(false)}
      swipeDirection="down"
      backdropOpacity={0.5}>
      <View style={styles.container}>
        <Text>Support Modal</Text>
      </View>
    </Modal>
  );
};

export default SupportModal;

const styles = StyleSheet.create({});
