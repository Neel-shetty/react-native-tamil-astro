import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {layout} from '../../../constants/layout';
import {colors} from '../../../themes/colors';
import StarGray from '../../../../assets/icons/ChatScreen/starGray.svg';
import StarGold from '../../../../assets/icons/ChatScreen/starGold.svg';
import {fonts} from '../../../themes/fonts';
import Close from '../../../../assets/icons/ChatScreen/close.svg';
import {Formik} from 'formik';

const FeedbackModal = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (value: boolean) => void;
}) => {
  const [rating, setRating] = React.useState(Array(5).fill({selected: false}));

  const numberofStars = rating.filter(item => item.selected).length;

  const selectRating = (index: number) => {
    const newRating = rating.map((_, i) => {
      if (i <= index) {
        return {selected: true};
      } else {
        return {selected: false};
      }
    });
    setRating(newRating);
  };

  return (
    <Modal
      style={styles.modal}
      onBackdropPress={() => {
        setVisible(false);
      }}
      onBackButtonPress={() => {
        setVisible(false);
      }}
      onSwipeCancel={() => {
        setVisible(false);
      }}
      swipeDirection={'down'}
      isVisible={visible}>
      <View style={styles.root}>
        <TouchableOpacity
          onPress={() => {
            setVisible(false);
          }}
          style={styles.closeContainer}>
          <Close />
        </TouchableOpacity>
        <Text style={styles.title}>
          Rate your conversation with the astrologer
        </Text>
        <View style={styles.starContainer}>
          {rating.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  selectRating(index);
                }}
                key={index}>
                {item.selected ? <StarGold /> : <StarGray />}
              </TouchableOpacity>
            );
          })}
        </View>
        <Formik
          initialValues={{message: ''}}
          onSubmit={(values, {resetForm}) => {
            if (numberofStars < 1) return;
            console.log(values);
            resetForm();
          }}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Comments"
                  placeholderTextColor={'#AE9292'}
                  onChangeText={handleChange('message')}
                  onBlur={handleBlur('message')}
                  value={values.message}
                />
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                style={[
                  styles.buttonContainer,
                  numberofStars < 1 ? styles.buttonGray : null,
                ]}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        <View style={styles.spacer} />
      </View>
    </Modal>
  );
};

export default FeedbackModal;

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  root: {
    width: layout.width - 35,
    height: 234,
    backgroundColor: colors.palette.white,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginTop: 20,
  },
  inputContainer: {
    // width: layout.width * 0.7,
    // height: 100,
    // backgroundColor: colors.palette.white,
    // borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: layout.width * 0.7,
    // backgroundColor: colors.palette.white,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingVertical: 5,
    margin: 0,
    fontSize: 14,
    fontFamily: fonts.interRegular,
    paddingHorizontal: 20,
    color: colors.text,
  },
  buttonContainer: {
    width: 103,
    height: 41,
    borderRadius: 23,
    backgroundColor: colors.palette.primary500,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  buttonText: {
    fontFamily: fonts.contageLight,
    fontSize: 16,
    color: colors.palette.buttonText,
  },
  title: {
    fontFamily: fonts.interMedium,
    color: colors.text,
  },
  closeContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  spacer: {
    height: 10,
  },
  buttonGray: {
    backgroundColor: '#E7E0D2',
  },
});
