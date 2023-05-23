import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useState} from 'react';
import {Platform, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {colors} from '../../../themes/colors';
import {layout} from '../../../constants/layout';
import {fonts} from '../../../themes/fonts';

const DatePicker = ({
  placeholder,
  setParentDate,
}: {
  placeholder: string;
  setParentDate: (date: Date) => void;
}) => {
  const [date, setDate] = useState<Date>();
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setParentDate(currentDate);
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
          value={date ?? new Date()}
          mode={'time'}
          is24Hour={false}
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
