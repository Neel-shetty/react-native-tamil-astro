import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import Timer from './Timer';
import Message from './Message';
import {layout} from '../../../constants/layout';
import ChatInput from './ChatInput';
import {Formik} from 'formik';
import RechargeModal from './RechargeModal';
import Balance0Modal from './Balance0Modal';
import FeedbackModal from './FeedbackModal';

const Chat = () => {
  const [messages, setMessages] = React.useState<string[]>([]);
  const [showRechargeModal, setShowRechargeModal] = React.useState(false);
  const [showBalance0Modal, setShowBalance0Modal] = React.useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = React.useState(false);
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
      <RechargeModal
        visible={showRechargeModal}
        setVisible={setShowRechargeModal}
      />
      <Balance0Modal
        visible={showBalance0Modal}
        setVisible={setShowBalance0Modal}
      />
      <FeedbackModal
        setVisible={setShowFeedbackModal}
        visible={showFeedbackModal}
      />
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
    marginBottom: 30,
  },
});
