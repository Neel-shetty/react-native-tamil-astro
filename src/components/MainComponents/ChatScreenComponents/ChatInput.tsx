import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Send from '../../../../assets/icons/ChatScreen/send.svg';
import Clip from '../../../../assets/icons/ChatScreen/clip.svg';
import {layout} from '../../../constants/layout';
import {fonts} from '../../../themes/fonts';
import {colors} from '../../../themes/colors';
import DocumentPicker from 'react-native-document-picker';

interface ChatInputProps {
  onPress: () => void;
  handleBlur: (e: any) => void;
  handleChange: (text: string) => void;
  value: string;
  disable: boolean;
}

const ChatInput = ({
  onPress,
  handleBlur,
  handleChange,
  value,
  disable,
}: ChatInputProps) => {
  async function pickFile() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.video],
        allowMultiSelection: false,
      });
      console.log(
        res[0].uri,
        res[0].type, // mime type
        res[0].name,
        res[0].size,
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        console.log(err);
      }
    }
  }
  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          style={styles.input}
          onChangeText={handleChange}
          onBlur={handleBlur}
          value={value}
          editable={!disable}
        />
        <View style={styles.clipContainer}>
          {/* <TouchableOpacity onPress={pickFile}>
            <Clip />
          </TouchableOpacity> */}
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
