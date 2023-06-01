import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {colors} from '../../../themes/colors';
import {fonts} from '../../../themes/fonts';
import {useDispatch} from 'react-redux';
import {setProblemCategory} from '../../../store/UiSlice';
import TextTicker from 'react-native-text-ticker';

interface CategoryButtonProps {
  title: string;
  logo: React.ReactNode;
  onPress: () => void;
}

const CategoryButton = ({title, logo, onPress}: CategoryButtonProps) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={[styles.root, styles.bg]}>
        <TouchableOpacity
          onPress={() => {
            onPress();
            dispatch(setProblemCategory(title));
          }}
          style={styles.root}>
          {/* <View style={styles.logoContainer}> */}
          {logo}
          {/* </View> */}
          <TextTicker style={styles.title}>{title}</TextTicker>
          <Image
            style={styles.image}
            source={require('../../../../assets/images/logoOpacity10.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(CategoryButton);

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
    marginVertical: 10,
    marginHorizontal: 'auto',
  },
  image: {
    position: 'absolute',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
