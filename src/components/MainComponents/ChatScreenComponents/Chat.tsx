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
import firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';
import {useRoute} from '@react-navigation/native';
import {ChatScreenNavigationProp} from '../../../router/types';

const Chat = () => {
  const [messages, setMessages] = React.useState<
    {
      uid: string;
      message: string;
    }[]
  >([]);
  const [showRechargeModal, setShowRechargeModal] = React.useState(false);
  const [showBalance0Modal, setShowBalance0Modal] = React.useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = React.useState(false);

  const route = useRoute<ChatScreenNavigationProp['route']>();

  const chatId = React.useMemo(() => route.params?.chatId, [route]);

  async function getMessages() {
    firestore()
      .collection('chats')
      .doc('12-16')
      .onSnapshot(doc => {
        // console.log('Current data: ', doc.data());
        setMessages(doc.data()?.messages);
      });
  }

  async function sendMessage(message: string) {
    const user = Auth().currentUser;
    // limit it to 50 recent messages
    await firestore()
      .collection('chats')
      .doc('12-16')
      .update({
        messages: firestore.FieldValue.arrayUnion({
          message,
          uid: user?.uid,
        }),
      });
  }

  React.useEffect(() => {
    getMessages();
  }, []);

  //wrap user in useMemo
  const user = React.useMemo(() => Auth().currentUser, []);

  return (
    <View style={styles.root}>
      <View style={styles.timerContainer}>
        <Timer />
      </View>
      <View style={styles.chatContainer}>
        {/* make it scroll to bottom automatically*/}
        <FlatList
          data={messages}
          renderItem={({item}) => {
            return (
              <Message
                textAlign={item.uid === user.uid ? 'right' : 'left'}
                message={item.message}
              />
            );
          }}
        />
        <Formik
          initialValues={{message: ''}}
          onSubmit={(values, {resetForm}) => {
            console.log(values);
            sendMessage(values.message);
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
