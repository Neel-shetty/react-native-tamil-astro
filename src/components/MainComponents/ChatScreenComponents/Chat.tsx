import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import Timer from './Timer';
import Message from './Message';
import {layout} from '../../../constants/layout';
import ChatInput from './ChatInput';
import {Formik} from 'formik';

const Chat = () => {
  const chats: {
    textAlign: 'right' | 'left';
    message: string;
  }[] = [
    {
      message:
        'Welcome to Tamil Astro. Please ask asked your question while astrologer joins.',
      textAlign: 'right',
    },
    {
      message:
        'Welcome to Tamil Astro. Please ask asked your question while astrologer joins.',
      textAlign: 'left',
    },
    {
      message: 'test',
      textAlign: 'right',
    },
  ];
  return (
    <View style={styles.root}>
      <View style={styles.timerContainer}>
        <Timer />
      </View>
      <View style={styles.chatContainer}>
        <FlatList
          data={chats}
          renderItem={({item}) => {
            return (
              <Message textAlign={item.textAlign} message={item.message} />
            );
          }}
        />
        <Formik
          initialValues={{message: ''}}
          onSubmit={(values, {resetForm}) => {
            console.log(values);
            resetForm();
          }}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <ChatInput
              handleBlur={handleBlur('message')}
              handleChange={handleChange('message')}
              value={values.message}
              onPress={handleSubmit}
            />
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  root: {},
  timerContainer: {},
  chatContainer: {
    flex: 1,
    width: layout.width - 20,
    borderWidth: 1,
  },
});
