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
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';
import {useRoute} from '@react-navigation/native';
import {ChatScreenNavigationProp} from '../../../router/types';
import {SendMessage} from '../../../api/SendMessage';
import {DeductBalance} from '../../../api/DeductBalance';
import {ExpireTrial} from '../../../api/ExpireTrial';
import {FlashList} from '@shopify/flash-list';

export type messagesType = {
  uid: string;
  message: string;
}[];

const Chat = () => {
  const [messages, setMessages] = React.useState<messagesType>([]);
  const [showRechargeModal, setShowRechargeModal] = React.useState(false);
  const [showBalance0Modal, setShowBalance0Modal] = React.useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = React.useState(false);

  const route = useRoute<ChatScreenNavigationProp['route']>();
  console.log('🚀 ~ file: Chat.tsx:31 ~ Chat ~ route:', route.params);
  const flatListRef = React.useRef<FlatList>(null);

  // const chatId = React.useMemo(() => route.params?.chatId, [route]);

  async function getMessages() {
    if (route.params?.history) {
      setMessages(route.params?.history);
      return;
    }
    firestore()
      .collection('chats')
      .doc(route.params?.chatId)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      // .limitToLast(5)
      .onSnapshot(doc => {
        console.log('🚀 ~ file: Chat.tsx:58 ~ getMessages ~ doc:', doc);
        const texts: messagesType = [];
        doc.forEach(message => {
          texts.push(message.data() as messagesType[0]);
        });
        setMessages(texts);
      });
  }

  const userID = React.useMemo(() => Auth().currentUser?.uid, []);
  const uniqueId = React.useMemo(
    () => Math.floor(100000 + Math.random() * 900000),
    [],
  );

  React.useEffect(() => {
    // a function that runs every 1 minute
    if (route.params?.history) {
      return;
    }
    let chatDetails: FirebaseFirestoreTypes.DocumentData;
    firestore()
      .collection('chats')
      .doc(route.params?.chatId)
      .get()
      .then(doc => {
        console.log('🚀 ~ file: Chat.tsx:91 ~ React.useEffect ~ doc:', doc);
        chatDetails = doc;
      });
    console.log(
      '🚀 ~ file: Chat.tsx:70 ~ React.useEffect ~ chatDetails:',
      chatDetails,
    );
    const interval = setInterval(() => {
      const id = Auth().currentUser?.uid;
      console.log('This will run every 1 minute!');
      async function run() {
        DeductBalance({
          id: id as string,
          amount: chatDetails.data()?.astrologerPrice,
          uniqueId: uniqueId,
          astrologerName: chatDetails.data()?.astrologerName,
        });
      }
      run();
    }, 60000);
    return () => clearInterval(interval);
  }, [uniqueId, route.params?.chatId, route.params?.history]);

  async function sendMessageToMyServer(message: string) {
    const ids = route.params?.chatId?.split('-');
    const astroId = ids?.filter(id => id !== userID);
    console.log(
      '🚀 ~ file: Chat.tsx:97 ~ sendMessageToMyServer ~ astroId:',
      astroId,
    );

    //generate random number of 6 digits
    console.log(
      '🚀 ~ file: Chat.tsx:50 ~ sendMessageToMyServer ~ uniqueId:',
      uniqueId,
    );
    if (astroId) {
      const res = SendMessage({
        to: astroId[0],
        message,
        from: userID,
        uniqueId,
      });
      // console.log('send message result- ---- ', res);
    }
  }

  async function sendMessage(message: string) {
    sendMessageToMyServer(message);
    const user = Auth().currentUser;
    // limit it to 50 recent messages
    await firestore()
      .collection('chats')
      .doc(route.params?.chatId)
      .collection('messages')
      .add({
        uid: user?.uid,
        message,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
  }

  React.useEffect(() => {
    ExpireTrial();
    getMessages();
  }, []);

  // React.useEffect(() => {
  //   const uniqueId = Math.floor(100000 + Math.random() * 900000);
  //   setRandomId(uniqueId);
  // }, [setRandomId]);

  //wrap user in useMemo
  const user = React.useMemo(() => Auth().currentUser, []);

  return (
    <View style={styles.root}>
      <View style={styles.timerContainer}>
        {!route.params?.history && <Timer />}
      </View>
      <View style={styles.chatContainer}>
        {/* make it scroll to bottom automatically*/}
        <FlashList
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
            if (messages?.length > 0) {
              flatListRef.current?.scrollToEnd({animated: true});
            }
          }}
          estimatedItemSize={100}
        />
        {!route.params?.history && (
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
        )}
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
