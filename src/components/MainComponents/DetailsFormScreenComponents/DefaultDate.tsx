import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../../themes/colors';
import {layout} from '../../../constants/layout';
import {fonts} from '../../../themes/fonts';

const DefaultDate = ({
  mode,
  placeholder,
  showDatePicker,
  initialValue,
}: {
  placeholder: string;
  mode: 'date' | 'time' | 'datetime';
  showDatePicker: (x: boolean) => void;
  initialValue: any;
}) => {
  const date = new Date(initialValue);
  return (
    <TouchableOpacity
      onPress={() => {
        showDatePicker(false);
      }}>
      <View style={styles.padding}>
        <View style={styles.root}>
          <Text style={[styles.input, date ? styles.selected : null]}>
            {(mode === 'time' && date?.toLocaleTimeString('en-US')) ??
              placeholder}
            {(mode === 'date' && date?.toLocaleDateString('en-US')) ??
              placeholder}
          </Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{''}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DefaultDate;

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
