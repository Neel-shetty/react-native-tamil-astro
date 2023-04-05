import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useState} from 'react';
import {
  Button,
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {colors} from '../../../themes/colors';
import {layout} from '../../../constants/layout';
import {fonts} from '../../../themes/fonts';

const DatePicker = ({placeholder}: {placeholder: string}) => {
  const [date, setDate] = useState<Date>();
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setShow(true);
        }}>
        <View style={styles.padding}>
          <View style={styles.root}>
            <Text style={[styles.input, date ? styles.selected : null]}>
              {date?.toLocaleTimeString('en-US') ?? placeholder}
            </Text>
          </View>
          <View style={styles.errorContainer}>
            <Text style={styles.error}>{''}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date ? date : new Date()}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  root: {
    borderColor: colors.palette.blackBorder,
    borderWidth: 1,
    height: 40,
    width: layout.widthp,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
  },
  input: {
    width: layout.width * 0.85,
    // height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: fonts.interRegular,
    color: colors.palette.gray500,
    fontSize: 12,
    // textAlign: 'center',
  },
  error: {
    color: colors.palette.accent500,
    fontFamily: fonts.imprima,
  },
  errorContainer: {
    width: layout.width * 0.85,
    paddingLeft: 18,
  },
  padding: {
    paddingVertical: 5,
  },
  selected: {
    color: colors.text,
  },
});
