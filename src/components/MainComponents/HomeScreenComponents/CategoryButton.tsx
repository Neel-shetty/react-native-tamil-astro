import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {colors} from '../../../themes/colors';
import {fonts} from '../../../themes/fonts';
import {layout} from '../../../constants/layout';

interface CategoryButtonProps {
  title: string;
  logo: React.ReactNode;
  onPress: () => void;
}

const CategoryButton = ({title, logo, onPress}: CategoryButtonProps) => {
  return (
    <View style={[styles.root, styles.bg]}>
      <TouchableOpacity onPress={onPress} style={styles.root}>
        {/* <View style={styles.logoContainer}> */}
        {logo}
        {/* </View> */}
        <Text style={styles.title}>{title}</Text>
        <Image
          style={styles.image}
          source={require('../../../../assets/images/logoOpacity10.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CategoryButton;

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.palette.primary300,
    width: 73,
    height: 69,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.palette.buttonText,
    fontSize: 16,
    fontFamily: fonts.contageRegular,
  },
  bg: {
    backgroundColor: 'white',
    elevation: 6,
    marginLeft: layout.width / 10,
    marginVertical: 10,
  },
  image: {
    position: 'absolute',
  },
});
