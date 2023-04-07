import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Send from '../../../../assets/icons/ChatScreen/send.svg';
import Clip from '../../../../assets/icons/ChatScreen/clip.svg';
import {layout} from '../../../constants/layout';
import {fonts} from '../../../themes/fonts';
import {colors} from '../../../themes/colors';

interface ChatInputProps {
  onPress: () => void;
  handleBlur: (e: any) => void;
  handleChange: (text: string) => void;
  value: string;
}

const ChatInput = ({
  onPress,
  handleBlur,
  handleChange,
  value,
}: ChatInputProps) => {
  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          style={styles.input}
          onChangeText={handleChange}
          onBlur={handleBlur}
          value={value}
        />
        <View style={styles.clipContainer}>
          <TouchableOpacity>
            <Clip />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sendContainer}>
        <TouchableOpacity onPress={onPress} style={styles.sendButton}>
          <Send />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: layout.width - 50,
    alignSelf: 'center',
    // backgroundColor: 'violet',
    // height: 40,
    maxHeight: 80,
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    // backgroundColor: 'pink',
    borderWidth: 1,
    borderRadius: 23,
    width: layout.width * 0.7,
    borderColor: 'rgba(0, 0, 0, 0.25)',
  },
  input: {
    width: layout.width * 0.6,
    // backgroundColor: 'yellow',
    paddingLeft: 20,
    fontFamily: fonts.interRegular,
    fontSize: 14,
    color: colors.text,
  },
  sendContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    borderRadius: 100,
    borderWidth: 1,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clipContainer: {
    // width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
