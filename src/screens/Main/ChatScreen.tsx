import {StyleSheet, View} from 'react-native';
import React from 'react';
import Chat from '../../components/MainComponents/ChatScreenComponents/Chat';
import {colors} from '../../themes/colors';

const ChatScreen = () => {
  return (
    <View style={styles.root}>
      <Chat />
    </View>
  );
};

export default {component: ChatScreen, name: 'ChatScreen' as const};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.palette.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
