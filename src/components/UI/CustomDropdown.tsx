import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../themes/colors';
import {layout} from '../../constants/layout';
import {fonts} from '../../themes/fonts';
import {Dropdown} from 'react-native-element-dropdown';
import {DropdownProps} from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';

type CustomInputPropsType = {
  placeholder: string;
  error: string | null;
  value: string;
  setValue: (value: string) => void;
};

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const CustomDropdown = ({
  placeholder,
  error,
  value,
  setValue,
}: CustomInputPropsType) => {
  // const [value, setValue] = useState<string>('');
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View>
      <View style={styles.root}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          containerStyle={styles.containerStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder="Search..."
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item: any) => {
            setIsFocus(false);
            setValue(item.value);
          }}
          renderRightIcon={true ? undefined : () => null}
        />
      </View>
      <View style={styles.errorContainer}>
        <Text style={styles.error}>{error ? error : ''}</Text>
      </View>
    </View>
  );
};

export default CustomDropdown;

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
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: fonts.interRegular,
    color: colors.text,
  },
  error: {
    color: colors.palette.accent500,
    fontFamily: fonts.imprima,
  },
  errorContainer: {
    width: layout.width * 0.85,
    paddingLeft: 18,
  },
  placeholderStyle: {
    color: colors.palette.gray500,
    fontFamily: fonts.interMedium,
    fontSize: 12,
    // paddingLeft: 10,
  },
  dropdown: {
    width: layout.width * 0.85,
    paddingHorizontal: 10,
  },
  selectedTextStyle: {
    color: colors.text,
    fontFamily: fonts.interRegular,
    fontSize: 12,
  },
  containerStyle: {
    backgroundColor: colors.palette.whiteWarm,
    borderRadius: 10,
  },
  iconStyle: {},
});
