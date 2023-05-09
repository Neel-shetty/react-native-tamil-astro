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
import {SendMessage} from '../../../api/SendMessage';

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
  const flatListRef = React.useRef<FlatList>(null);

  // const chatId = React.useMemo(() => route.params?.chatId, [route]);

  async function getMessages() {
    firestore()
      .collection('chats')
      .doc(route.params?.chatId)
      .onSnapshot(doc => {
        // console.log('Current data: ', doc.data());
        setMessages(doc.data()?.messages);
      });
  }

  const userID = React.useMemo(() => Auth().currentUser?.uid, []);
  async function sendMessageToMyServer(message: string) {
    const ids = route.params?.chatId?.split('-');
    const astroId = ids?.filter(id => id !== userID);

    //generate random number of 6 digits
    const uniqueId = Math.floor(100000 + Math.random() * 900000);
    if (astroId) {
      SendMessage({to: astroId[0], message, from: userID, uniqueId});
    }
  }

  async function sendMessage(message: string) {
    sendMessageToMyServer(message);
    const user = Auth().currentUser;
    // limit it to 50 recent messages
    await firestore()
      .collection('chats')
      .doc(route.params?.chatId)
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
          ref={flatListRef}
          onContentSizeChange={({}) => {
            if (messages.length > 0) {
              flatListRef.current?.scrollToEnd({animated: true});
            }
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
